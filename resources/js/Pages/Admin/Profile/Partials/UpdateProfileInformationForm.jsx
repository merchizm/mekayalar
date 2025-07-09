import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.profile.update'));
    };

    const formInputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 sm:text-sm";
    const formLabelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profil Bilgileri</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Hesabınızın profil bilgilerini ve e-posta adresini güncelleyin.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="name" className={formLabelClass}>İsim</label>

                    <input
                        id="name"
                        className={formInputClass}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                    />

                    {errors.name && <div className="text-red-500 mt-2 text-xs">{errors.name}</div>}
                </div>

                <div>
                    <label htmlFor="email" className={formLabelClass}>E-posta</label>

                    <input
                        id="email"
                        type="email"
                        className={formInputClass}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    {errors.email && <div className="text-red-500 mt-2 text-xs">{errors.email}</div>}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            E-posta adresiniz doğrulanmamış.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Doğrulama e-postasını yeniden göndermek için buraya tıklayın.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                Kayıt sırasında verdiğiniz e-posta adresine yeni bir doğrulama bağlantısı gönderildi.
                            </div>
                        )}
                    </div>
                )}

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
