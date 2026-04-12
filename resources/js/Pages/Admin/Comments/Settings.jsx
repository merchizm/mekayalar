import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const toTextareaValue = (value) => {
    if (!Array.isArray(value)) {
        return '';
    }
    return value.join('\n');
};

export default function Settings({ auth, blacklist = [], bannedIps = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        blacklist: toTextareaValue(blacklist),
        banned_ips: toTextareaValue(bannedIps),
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('admin.comments.settings.update'));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Yorum Ayarları" />

            <div className="rounded-lg border border-border bg-card shadow-sm dark:border-border dark:bg-card">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4 dark:border-border">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Yorum Ayarları</h3>
                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                            Kara liste ve yasaklı IP adreslerini yönetin.
                        </p>
                    </div>
                    <Link
                        href={route('admin.comments.index')}
                        className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary/70 dark:border-border dark:text-foreground dark:hover:bg-secondary"
                    >
                        Yorumlara Dön
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6 p-6">
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                            Kara Liste (satır başına bir kelime/ifade)
                        </label>
                        <textarea
                            rows="8"
                            value={data.blacklist}
                            onChange={(event) => setData('blacklist', event.target.value)}
                            className="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring dark:border-border dark:bg-card dark:text-foreground"
                        />
                        {errors.blacklist && <p className="mt-1 text-xs text-destructive">{errors.blacklist}</p>}
                    </div>

                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                            Yasaklı IP Adresleri (satır başına bir IP)
                        </label>
                        <textarea
                            rows="6"
                            value={data.banned_ips}
                            onChange={(event) => setData('banned_ips', event.target.value)}
                            className="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring dark:border-border dark:bg-card dark:text-foreground"
                        />
                        {errors.banned_ips && <p className="mt-1 text-xs text-destructive">{errors.banned_ips}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
