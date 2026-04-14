import { acceptHMRUpdate, defineStore } from 'pinia'
import { openToast } from '@/components/toast/toast'
import type { IHealthData, IHomeHealthStorage } from '@/types/home'
import { getStorage, setStorage } from '@/utils/storage'

const HOME_HEALTH_STORAGE_KEY = 'vue3-h5-home-health'
const HOME_HEALTH_TTL = 3 * 60 * 1000

function createDefaultHealthData(): IHealthData {
  return {
    isLoading: true,
    hasData: false,
  }
}

function normalizeHealthData(healthData?: Partial<IHealthData> | null): IHealthData {
  return {
    ...createDefaultHealthData(),
    ...healthData,
    isLoading: false,
    hasData: Boolean(healthData?.hasData),
  }
}

export const useHomeStore = defineStore('home', () => {
  const healthData = ref<IHealthData>(createDefaultHealthData())
  const lastFetchedAt = ref(0)
  const hydrated = ref(false)
  let pendingFetchPromise: Promise<void> | null = null

  const hasCachedHealthData = computed<boolean>(() => lastFetchedAt.value > 0)

  function persistState(): void {
    if (!hydrated.value || !hasCachedHealthData.value) {
      return
    }

    setStorage<IHomeHealthStorage>(HOME_HEALTH_STORAGE_KEY, {
      healthData: normalizeHealthData(healthData.value),
      lastFetchedAt: lastFetchedAt.value,
    })
  }

  function hydrateFromStorage(): void {
    if (hydrated.value) {
      return
    }

    const snapshot = getStorage<IHomeHealthStorage>(HOME_HEALTH_STORAGE_KEY, {
      healthData: createDefaultHealthData(),
      lastFetchedAt: 0,
    })

    if (snapshot.lastFetchedAt > 0) {
      healthData.value = normalizeHealthData(snapshot.healthData)
      lastFetchedAt.value = snapshot.lastFetchedAt
    }

    hydrated.value = true
  }

  function isHealthDataStale(): boolean {
    if (!lastFetchedAt.value) {
      return true
    }

    return Date.now() - lastFetchedAt.value >= HOME_HEALTH_TTL
  }

  async function requestHealthData(showSkeleton: boolean): Promise<void> {
    if (pendingFetchPromise) {
      return pendingFetchPromise
    }

    if (showSkeleton) {
      healthData.value = createDefaultHealthData()
    }

    pendingFetchPromise = (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        healthData.value = {
          isLoading: false,
          hasData: true,
          abnormalMetrics: [
            { name: '心率', value: '89次/分', isAbnormal: true },
            { name: '压力指数', value: '7级', isAbnormal: true },
          ],
          healthAdvice: '建议今天适当放缓节奏，做做深呼吸减压；今晚请提早休息，睡个好觉，让身心好好恢复！',
        }
        lastFetchedAt.value = Date.now()
        persistState()
      } catch {
        if (!hasCachedHealthData.value) {
          healthData.value = {
            isLoading: false,
            hasData: false,
          }
        }

        openToast({
          message: '数据拉取失败，请重试',
          position: 'top',
        })
      } finally {
        pendingFetchPromise = null
      }
    })()

    return pendingFetchPromise
  }

  async function ensureHealthData(): Promise<void> {
    hydrateFromStorage()

    if (!isHealthDataStale()) {
      return
    }

    await requestHealthData(!hasCachedHealthData.value)
  }

  async function refreshHealthData(): Promise<void> {
    hydrateFromStorage()
    await requestHealthData(!hasCachedHealthData.value)
  }

  return {
    healthData,
    lastFetchedAt,
    hydrated,
    hasCachedHealthData,
    hydrateFromStorage,
    ensureHealthData,
    refreshHealthData,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHomeStore, import.meta.hot))
}
