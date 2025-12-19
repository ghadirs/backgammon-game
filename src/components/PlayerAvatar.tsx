import React from 'react';
import styles from './PlayerAvatar.module.scss';

interface PlayerAvatarProps {
    name: string;
    balance: string;
    flag: string; // e.g., "🇮🇹"
    image: string;
    color: string;
    align?: 'left' | 'right';
}

export const PlayerAvatar = ({name, balance, flag, image, color, align = 'left'}: PlayerAvatarProps) => {
    return (
        <div className={`${styles.container} ${styles[align]}`}>
            <div className={`${styles.hexagonStroke} ${styles[color]}`}>
                <div className={styles.hexagonInner}>
                    <img src={image} alt={name} className={styles.avatarImg}/>
                </div>
            </div>
            <div className={styles.meta}>
                <div className={styles.nameRow}>
                    <span className={styles.flag}>{flag}</span>
                    <span className={styles.name}>{name}</span>
                </div>
                <div className={styles.balanceRow}>
                    <span className={styles.diamondIcon}>💎</span>
                    <span className={styles.balance}>{balance}</span>
                </div>
            </div>
        </div>
    );
};