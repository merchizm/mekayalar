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

    const formInputClass =
        'mt-1 block w-full rounded-md border-input shadow-sm focus:border-ring focus:ring-ring dark:bg-secondary dark:border-border dark:text-foreground sm:text-sm';
    const formLabelClass = 'block text-sm font-medium text-muted-foreground dark:text-muted-foreground';

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-foreground dark:text-foreground">Profil Bilgileri</h2>

                <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                    Hesabınızın profil bilgilerini ve e-posta adresini güncelleyin.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="name" className={formLabelClass}>
                        İsim
                    </label>

                    <input
                        id="name"
                        className={formInputClass}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                    />

                    {errors.name && <div className="mt-2 text-xs text-destructive">{errors.name}</div>}
                </div>

                <div>
                    <label htmlFor="email" className={formLabelClass}>
                        E-posta
                    </label>

                    <input
                        id="email"
                        type="email"
                        className={formInputClass}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    {errors.email && <div className="mt-2 text-xs text-destructive">{errors.email}</div>}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-foreground dark:text-foreground">
                            E-posta adresiniz doğrulanmamış.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-muted-foreground underline hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:text-muted-foreground dark:hover:text-foreground dark:focus:ring-offset-gray-800"
                            >
                                Doğrulama e-postasını yeniden göndermek için buraya tıklayın.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-success dark:text-success">
                                Kayıt sırasında verdiğiniz e-posta adresine yeni bir doğrulama bağlantısı gönderildi.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-blue-300 transition duration-150 ease-in-out hover:bg-primary focus:border-ring focus:outline-none focus:ring active:bg-blue-900 disabled:opacity-25"
                        disabled={processing}
                    >
                        Kaydet
                    </button>

                    {recentlySuccessful && (
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">Kaydedildi.</p>
                    )}
                </div>
            </form>
        </section>
    );
}
