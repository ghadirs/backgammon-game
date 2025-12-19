import React from 'react';
import styles from './Toggle.module.scss';

export const Toggle = ({enabled, setEnabled}: { enabled: boolean, setEnabled: (v: boolean) => void }) => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>Auto roll</span>
            <button
                className={`${styles.switch} ${enabled ? styles.active : ''}`}
                onClick={() => setEnabled(!enabled)}
            >
                <div className={styles.handle}/>
            </button>
        </div>
    );
};