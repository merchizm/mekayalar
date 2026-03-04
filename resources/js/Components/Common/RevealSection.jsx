import React from 'react';
import { motion } from 'framer-motion';

export default function RevealSection({
    children,
    className = '',
    delay = 0,
    y = 28,
    as = 'div',
    ...props
}) {
    const Component = motion[as] || motion.div;

    return (
        <Component
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
            {...props}
        >
            {children}
        </Component>
    );
}
