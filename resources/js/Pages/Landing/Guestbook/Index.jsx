import React, { useMemo, useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import RevealSection from '@/Components/Common/RevealSection';

const emojiOptions = ['👍', '❤️', '🔥', '🎉', '✨', '😂', '👏', '😮', '🤍', '🌍'];

const sortOptions = [
    { value: 'newest', label: 'En Yeni' },
    { value: 'oldest', label: 'En Eski' },
    { value: 'popular', label: 'En Çok Tepki' },
];

export default function GuestbookIndex({ entries = [], honeypot = null, guestbookStatus = null }) {
    const {
        props: { auth },
    } = usePage();
    const [emojiPickerFor, setEmojiPickerFor] = useState(null);
    const [sort, setSort] = useState('newest');
    const [replyDrafts, setReplyDrafts] = useState({});
    const [replyErrors, setReplyErrors] = useState({});

    const honeypotData = useMemo(() => {
        if (!honeypot?.enabled) {
            return {};
        }

        return {
            [honeypot.nameFieldName]: '',
            [honeypot.validFromFieldName]: honeypot.encryptedValidFrom,
        };
    }, [honeypot]);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: auth?.user?.name || '',
        message: '',
        ...honeypotData,
    });

    const sortedEntries = useMemo(() => {
        const copy = [...entries];
        const score = (entry) => Object.values(entry.reactions || {}).reduce((sum, count) => sum + count, 0);

        copy.sort((a, b) => {
            if (sort === 'oldest') {
                return (a.created_at || '').localeCompare(b.created_at || '');
            }
            if (sort === 'popular') {
                return score(b) - score(a);
            }
            return (b.created_at || '').localeCompare(a.created_at || '');
        });

        return copy;
    }, [entries, sort]);

    const submit = (event) => {
        event.preventDefault();
        post(route('guestbook.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('message');
            },
        });
    };

    const toggleReaction = (entryId, emoji) => {
        router.post(route('guestbook.react', entryId), { emoji }, { preserveScroll: true });
        setEmojiPickerFor(null);
    };

    const pickersOpen = (entryId) => emojiPickerFor === entryId;

    const updateReplyDraft = (entryId, value) => {
        setReplyDrafts((prev) => ({ ...prev, [entryId]: value }));
    };

    const submitReply = (entryId) => {
        if (!auth?.user) {
            return;
        }

        const message = replyDrafts[entryId] || '';

        router.post(
            route('guestbook.reply', entryId),
            { message },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setReplyDrafts((prev) => ({ ...prev, [entryId]: '' }));
                    setReplyErrors((prev) => ({ ...prev, [entryId]: null }));
                },
                onError: (errors) => {
                    setReplyErrors((prev) => ({ ...prev, [entryId]: errors.message }));
                },
            }
        );
    };

    return (
        <div className="space-y-12">
            <RevealSection as="header" className="text-center">
                <h1 className="text-5xl font-bold tracking-tight text-foreground dark:text-foreground">
                    {__('Ziyaretçi Defteri')}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground dark:text-muted-foreground">
                    {__(
                        'Buraya bir not bırakabilir, düşüncelerini paylaşabilir ve sayfada küçük bir izin kalmasını sağlayabilirsin.'
                    )}
                </p>
            </RevealSection>

            <section className="space-y-10">
                <RevealSection
                    id="guestbook-form"
                    className="surface-lift rounded-3xl border border-border bg-background p-6 shadow-lg dark:border-border dark:bg-muted"
                    delay={0.04}
                >
                    <h2 className="text-lg font-semibold text-foreground dark:text-foreground">{__('Mesaj Bırak')}</h2>
                    <form onSubmit={submit} className="mt-4 space-y-4">
                        {honeypot?.enabled && (
                            <>
                                <input
                                    type="text"
                                    name={honeypot.nameFieldName}
                                    value={data[honeypot.nameFieldName] || ''}
                                    onChange={(event) => setData(honeypot.nameFieldName, event.target.value)}
                                    className="hidden"
                                    tabIndex="-1"
                                    autoComplete="off"
                                />
                                <input
                                    type="text"
                                    name={honeypot.validFromFieldName}
                                    value={data[honeypot.validFromFieldName] || ''}
                                    onChange={(event) => setData(honeypot.validFromFieldName, event.target.value)}
                                    className="hidden"
                                    tabIndex="-1"
                                    autoComplete="off"
                                />
                            </>
                        )}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                {__('İsim')}
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                                className="mt-2 w-full rounded-xl border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring dark:border-border dark:bg-secondary dark:text-foreground"
                            />
                            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                {__('Mesaj')}
                            </label>
                            <textarea
                                rows="4"
                                value={data.message}
                                onChange={(event) => setData('message', event.target.value)}
                                className="mt-2 w-full rounded-xl border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring dark:border-border dark:bg-secondary dark:text-foreground"
                            />
                            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {__('Gönder')}
                        </button>
                        {guestbookStatus === 'pending' && (
                            <p className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-500/60 dark:bg-amber-900/20 dark:text-amber-200">
                                {__('Mesajın alındı. Onaylandıktan sonra ziyaretçi defterinde yayınlanacak.')}
                            </p>
                        )}
                        {guestbookStatus === 'published' && (
                            <p className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-500/60 dark:bg-emerald-900/20 dark:text-emerald-200">
                                {__('Mesajın yayınlandı. Katkın için teşekkürler.')}
                            </p>
                        )}
                    </form>
                </RevealSection>
                <RevealSection
                    className="surface-lift rounded-3xl border border-border bg-background p-5 shadow-lg dark:border-border dark:bg-muted"
                    delay={0.08}
                >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2
                                id="guestbook-title"
                                className="text-lg font-semibold text-foreground dark:text-foreground"
                            >
                                {__('Ziyaretçi Defteri')}
                            </h2>
                            <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                                {__(':count kayıt', { count: entries.length })}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 rounded-full border border-border bg-secondary p-1 text-xs font-semibold dark:border-border dark:bg-secondary">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setSort(option.value)}
                                    className={`interactive-pill rounded-full px-3 py-1 transition ${
                                        sort === option.value
                                            ? 'bg-primary text-white'
                                            : 'text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground'
                                    }`}
                                >
                                    {__(option.label)}
                                </button>
                            ))}
                        </div>
                    </div>
                </RevealSection>

                <div className="space-y-4">
                    {sortedEntries.length === 0 && (
                        <RevealSection className="my-5 rounded-2xl border-2 border-dashed border-border bg-background py-20 text-center dark:border-border dark:bg-card">
                            <h2 className="mb-3 text-3xl font-bold text-foreground dark:text-foreground">
                                {__('Henüz kayıt yok')}
                            </h2>
                            <p className="mx-auto max-w-xl text-center text-base text-muted-foreground dark:text-muted-foreground">
                                {__('Bu deftere ilk notu sen bırak. Kısa bir selam bile burayı canlandırır.')}
                            </p>
                            <a
                                href="#guestbook-title"
                                className="interactive-pill mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                            >
                                {__('İlk Mesajı Yaz')}
                            </a>
                        </RevealSection>
                    )}
                    {sortedEntries.map((entry) => (
                        <RevealSection
                            key={entry.id}
                            className="surface-lift rounded-3xl border border-border bg-background p-5 shadow-lg dark:border-border dark:bg-muted"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
                                            entry.avatar_seed
                                        )}`}
                                        alt={entry.name}
                                        className="h-11 w-11 rounded-full border border-border bg-secondary dark:border-border dark:bg-secondary"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground dark:text-foreground">
                                            {entry.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                                            {entry.location?.city || entry.location?.country || __('Bilinmiyor')}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setEmojiPickerFor(pickersOpen(entry.id) ? null : entry.id)}
                                    className="interactive-pill rounded-full border border-border bg-secondary px-2 py-1 text-xs font-semibold text-foreground shadow-sm transition hover:bg-accent dark:border-border dark:bg-secondary dark:text-foreground"
                                >
                                    +
                                </button>
                            </div>
                            <p className="mt-4 text-sm text-foreground dark:text-foreground">{entry.message}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {Object.entries(entry.reactions || {}).map(([emoji, count]) => (
                                    <button
                                        key={emoji}
                                        type="button"
                                        onClick={() => toggleReaction(entry.id, emoji)}
                                        className={`interactive-pill rounded-full border px-2 py-1 text-xs ${
                                            entry.reacted?.includes(emoji)
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-border bg-background text-foreground dark:border-border dark:bg-secondary dark:text-foreground'
                                        }`}
                                    >
                                        {emoji} {count}
                                    </button>
                                ))}
                            </div>
                            {entry.replies?.length > 0 && (
                                <div className="mt-4 space-y-3 border-t border-border pt-4 dark:border-border">
                                    {entry.replies.map((reply) => (
                                        <div key={reply.id} className="flex gap-3">
                                            <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                                            <div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-muted-foreground">
                                                    <span className="font-semibold text-foreground dark:text-foreground">
                                                        {reply.commenter?.name || 'Admin'}
                                                    </span>
                                                    {reply.commenter?.is_admin && (
                                                        <span className="inline-flex items-center rounded-full border border-violet-300 bg-violet-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm dark:border-violet-500/60 dark:bg-violet-500 dark:text-foreground">
                                                            Admin
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-1 text-sm text-foreground dark:text-foreground">
                                                    {reply.message}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {auth?.user && (
                                <div className="mt-4 border-t border-border pt-4 dark:border-border">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        {__('Yanıtla')}
                                    </label>
                                    <textarea
                                        rows="2"
                                        value={replyDrafts[entry.id] || ''}
                                        onChange={(event) => updateReplyDraft(entry.id, event.target.value)}
                                        className="mt-2 w-full rounded-xl border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring dark:border-border dark:bg-secondary dark:text-foreground"
                                    />
                                    {replyErrors[entry.id] && (
                                        <p className="mt-1 text-xs text-destructive">{replyErrors[entry.id]}</p>
                                    )}
                                    <div className="mt-2 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => submitReply(entry.id)}
                                            className="interactive-pill rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
                                        >
                                            {__('Yanıtla')}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {pickersOpen(entry.id) && (
                                <div className="mt-3 flex flex-wrap gap-2 rounded-2xl border border-border bg-background p-3 dark:border-border dark:bg-secondary">
                                    {emojiOptions.map((emoji) => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => toggleReaction(entry.id, emoji)}
                                            className="interactive-pill rounded-lg border border-border bg-secondary px-2 py-1 text-sm hover:bg-accent dark:border-border dark:bg-secondary"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </RevealSection>
                    ))}
                </div>
            </section>
        </div>
    );
}

GuestbookIndex.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;
