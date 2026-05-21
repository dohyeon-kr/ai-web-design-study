import type { ComponentType } from 'react';
import { IconGift, IconPencil, IconPointer, IconRefresh } from '../icons';

export type Point = number;

export type TaskType =
  | 'clickViewing'
  | 'postingViewing'
  | 'bonusViewing'
  | 'autoViewing';

export type TaskCard = {
  type: TaskType;
  label: string;
  headline: string;
  reward: Point;
  remaining: number;
  total: number;
  iconBg: string;
  cardSurface: string;
  Icon: ComponentType<{ size?: number }>;
  hot?: boolean;
};

export type Promotion = {
  id: string;
  title: string;
  body: string;
  cta: string;
  reward: Point;
  surface: string;
  badge: string;
  image: string;
};

export type Ranker = {
  rank: number;
  nickname: string;
  point: Point;
  delta: number;
  me?: boolean;
};

export type Stamp = {
  day: number;
  label: string;
  done: boolean;
  today?: boolean;
  reward: Point;
};

export const TODAY_POINT: Point = 2480;
export const TODAY_GOAL: Point = 5000;

export const STAMPS: Stamp[] = [
  { day: 1, label: '월', done: true, reward: 50 },
  { day: 2, label: '화', done: true, reward: 50 },
  { day: 3, label: '수', done: true, reward: 50 },
  { day: 4, label: '목', done: false, today: true, reward: 100 },
  { day: 5, label: '금', done: false, reward: 50 },
  { day: 6, label: '토', done: false, reward: 50 },
  { day: 7, label: '일', done: false, reward: 300 },
];

export const TASKS: TaskCard[] = [
  {
    type: 'clickViewing',
    label: '클릭형',
    headline: '광고 클릭하고\n즉시 적립',
    reward: 30,
    remaining: 12,
    total: 20,
    iconBg: '#ff6b3d',
    cardSurface: 'var(--surface-card-click)',
    Icon: IconPointer,
    hot: true,
  },
  {
    type: 'postingViewing',
    label: '포스팅형',
    headline: '리뷰 작성하면\n포인트 UP',
    reward: 500,
    remaining: 3,
    total: 5,
    iconBg: '#ff9050',
    cardSurface: 'var(--surface-card-posting)',
    Icon: IconPencil,
  },
  {
    type: 'bonusViewing',
    label: '보너스',
    headline: '오늘만 보너스\n2배 적립',
    reward: 1000,
    remaining: 1,
    total: 1,
    iconBg: '#ffb020',
    cardSurface: 'var(--surface-card-bonus)',
    Icon: IconGift,
    hot: true,
  },
  {
    type: 'autoViewing',
    label: '자동형',
    headline: '백그라운드로\n자동 적립',
    reward: 10,
    remaining: 99,
    total: 100,
    iconBg: '#d8956b',
    cardSurface: 'var(--surface-card-auto)',
    Icon: IconRefresh,
  },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'p1',
    title: '친구 초대하면\n5,000P 즉시 지급',
    body: '코드 한 번이면 끝나요',
    cta: '초대 링크 받기',
    reward: 5000,
    surface: 'var(--surface-promo-primary)',
    badge: '추천',
    image: 'images/promo-invite.png',
  },
  {
    id: 'p2',
    title: '광고 시청 챌린지\n100회 도전',
    body: '완료 시 1만 포인트',
    cta: '도전 시작',
    reward: 10000,
    surface: 'var(--surface-promo-dark)',
    badge: 'HOT',
    image: 'images/promo-challenge.png',
  },
  {
    id: 'p3',
    title: '주말 한정\n포인트 2배 이벤트',
    body: '금·토·일 자정까지',
    cta: '이벤트 보기',
    reward: 2,
    surface: 'var(--surface-promo-warm)',
    badge: '주말',
    image: 'images/promo-invite.png',
  },
];

export const RANKERS: Ranker[] = [
  { rank: 1, nickname: '포인트마스터', point: 184200, delta: 12000 },
  { rank: 2, nickname: '클릭요정', point: 152800, delta: 8400 },
  { rank: 3, nickname: '리뷰왕김씨', point: 138100, delta: 6200 },
  { rank: 24, nickname: '나 (도현)', point: 48720, delta: 2480, me: true },
];
