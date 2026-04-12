export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `button-primary rounded-md px-4 py-2 text-xs uppercase tracking-widest ${disabled && 'opacity-25'} ` +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
