import type { IContentCard, IRouteTabItem } from '@/types/common'

export const TOKEN_KEY = 'vue3-h5-token'

export const ROUTE_WHITE_LIST = ['/login']

export const TAB_BAR_LIST: IRouteTabItem[] = [
  { label: '首页', name: 'home', path: '/home', icon: 'home-o' },
  { label: '我的', name: 'my', path: '/my', icon: 'manager-o' },
]

export const CONTENT_LIST: IContentCard[] = [
  {
    id: 'activity-001',
    title: '夏日焕新计划',
    subtitle: '高转化活动页模板',
    summary: '适合活动营销、秒杀报名、裂变分享等高频移动端场景。',
    cover:
      'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=800&q=80',
    tags: ['活动页', '运营', '高转化'],
  },
  {
    id: 'mall-002',
    title: '移动商城商品卡',
    subtitle: '适合列表、推荐位、详情引流',
    summary: '支持价格、标签、优惠角标与多场景复用，适合 H5 商城快速搭建。',
    cover:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
    tags: ['商城', '商品', '推荐'],
    price: 199,
  },
  {
    id: 'profile-003',
    title: '会员成长中心',
    subtitle: '个人中心模板',
    summary: '内置等级卡、权益信息和快捷入口，便于快速组合成个人中心首页。',
    cover:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    tags: ['个人中心', '会员', '运营'],
  },
]
