export interface IHealthMetric {
  name: string
  value: string
  isAbnormal: boolean
}

export interface IHealthData {
  isLoading: boolean
  hasData: boolean
  abnormalMetrics?: IHealthMetric[]
  healthAdvice?: string
  rawText?: string
}

export interface IHomeHealthStorage {
  healthData: IHealthData
  lastFetchedAt: number
}
