import { useRef } from 'react';
import { useForm } from '@inertiajs/react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    const formInputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 sm:text-sm";
    const formLabelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Şifre Güncelle</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Hesabınızın güvende kalması için uzun ve rastgele bir şifre kullandığınızdan emin olun.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="current_password" className={formLabelClass}>Mevcut Şifre</label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className={formInputClass}
                        autoComplete="current-password"
                    />
                    {errors.current_password && <div className="text-red-500 mt-2 text-xs">{errors.current_password}</div>}
                </div>

                <div>
                    <label htmlFor="password" className={formLabelClass}>Yeni Şifre</label>
                    <input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className={formInputClass}
                        autoComplete="new-password"
                    />
                    {errors.password && <div className="text-red-500 mt-2 text-xs">{errors.password}</div>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className={formLabelClass}>Yeni Şifre (Tekrar)</label>
                    <input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className={formInputClass}
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && <div className="text-red-500 mt-2 text-xs">{errors.password_confirmation}</div>}
                </div>

                <div className="flex items-center gap-4">
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150" disabled={processing}>Kaydet</button>

                    {recentlySuccessful && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">Kaydedildi.</p>
                    )}
                </div>
            </form>
        </section>
    );
}
