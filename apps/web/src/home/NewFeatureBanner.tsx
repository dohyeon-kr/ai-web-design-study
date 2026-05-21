import styles from './NewFeatureBanner.module.css';

export default function NewFeatureBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <span className={styles.tag}>NEW</span>
        <h4 className={styles.title}>AI 추천 미션이 도착했어요</h4>
        <p className={styles.body}>당신의 활동 패턴에 맞춘 고수익 미션 3개</p>
      </div>
      <button type="button" className={styles.cta}>
        확인
      </button>
    </div>
  );
}
