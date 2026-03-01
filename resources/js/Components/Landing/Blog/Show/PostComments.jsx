import React, { useMemo, useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';

const formatDate = (value) => {
    if (!value) {
        return '';
    }
    const date = new Date(value);
    return date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const buildInitials = (name) => {
    if (!name) {
        return '?';
    }
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');
};

export default function PostComments({
    post,
    comments = [],
    commentsCount = 0,
    approvalRequired = false,
    order = 'latest',
    repliesEnabled = true,
    honeypot = null,
}) {
    const {
        props: { auth },
    } = usePage();
    const isGuest = !auth?.user;
    const honeypotData = useMemo(() => {
        if (!honeypot?.enabled) {
            return {};
        }
        return {
            [honeypot.nameFieldName]: '',
            [honeypot.validFromFieldName]: honeypot.encryptedValidFrom,
        };
    }, [honeypot]);
    const { data, setData, post: submit, processing, reset, errors } = useForm({
        text: '',
        name: '',
        email: '',
        action: 'comment',
        ...honeypotData,
    });
    const [replyingTo, setReplyingTo] = useState(null);
    const replyForm = useForm({
        text: '',
        name: '',
        email: '',
        comment_id: null,
        action: 'reply',
        ...honeypotData,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        submit(route('blog.comments.store', post.post_slug), {
            preserveScroll: true,
            onSuccess: () => {
                reset('text');
                if (honeypot?.enabled) {
                    setData(honeypot.validFromFieldName, honeypot.encryptedValidFrom);
                    setData(honeypot.nameFieldName, '');
                }
            },
        });
    };

    const handleReplySubmit = (event) => {
        event.preventDefault();
        replyForm.post(route('blog.comments.store', post.post_slug), {
            preserveScroll: true,
            onSuccess: () => {
                replyForm.reset('text');
                if (honeypot?.enabled) {
                    replyForm.setData(honeypot.validFromFieldName, honeypot.encryptedValidFrom);
                    replyForm.setData(honeypot.nameFieldName, '');
                }
                setReplyingTo(null);
            },
        });
    };

    const handleOrderChange = (event) => {
        router.get(
            route('blog.show', post.post_slug),
            { order: event.target.value },
            { preserveScroll: true, replace: true }
        );
    };

    const toggleLike = (commentId) => {
        router.post(
            route('blog.comments.store', post.post_slug),
            {
                action: 'like',
                comment_id: commentId,
                name: isGuest ? data.name : undefined,
                email: isGuest ? data.email : undefined,
            },
            { preserveScroll: true }
        );
    };

    const openReplyForm = (commentId) => {
        setReplyingTo(commentId);
        replyForm.setData('comment_id', commentId);
    };

    return (
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yorumlar</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {commentsCount} yorum
                    </p>
                </div>
                <div>
                    <select
                        value={order}
                        onChange={handleOrderChange}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <option value="latest">En yeni</option>
                        <option value="oldest">En eski</option>
                    </select>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {honeypot?.enabled && (
                    <>
                        <input
                            type="text"
                            name={honeypot.nameFieldName}
                            value={data[honeypot.nameFieldName] || ''}
                            onChange={(event) => setData(honeypot.nameFieldName, event.target.value)}
                            className="hidden"
                            autoComplete="off"
                            tabIndex="-1"
                        />
                        <input
                            type="hidden"
                            name={honeypot.validFromFieldName}
                            value={data[honeypot.validFromFieldName] || ''}
                        />
                    </>
                )}
                {isGuest && (
                    <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            İsim
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                                className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                E-posta
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                                className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>
                    </div>
                )}
                <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Yorumunuz
                    </label>
                    <textarea
                        rows="4"
                        value={data.text}
                        onChange={(event) => setData('text', event.target.value)}
                        className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                    {errors.text && <p className="mt-1 text-xs text-red-500">{errors.text}</p>}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    {approvalRequired && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Yorumlar inceleme sonrası yayınlanabilir.
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        Yorum Gönder
                    </button>
                </div>
            </form>

            <div className="mt-8 space-y-6">
                {comments.length === 0 && (
                    <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                        Henüz yorum yok. İlk yorumu bırakmak ister misin?
                    </div>
                )}
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className={`flex gap-4 rounded-xl border p-4 shadow-sm ${
                            comment.is_pinned
                                ? 'border-amber-200 bg-amber-50/60 dark:border-amber-700/60 dark:bg-amber-900/20'
                                : 'border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900'
                        }`}
                    >
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-sm font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            {comment.commenter?.photo ? (
                                <img
                                    src={comment.commenter.photo}
                                    alt={comment.commenter?.name || 'Guest'}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                buildInitials(comment.commenter?.name)
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {comment.commenter?.name || 'Ziyaretçi'}
                                </p>
                                {comment.commenter?.is_admin && (
                                    <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-white dark:bg-gray-100 dark:text-gray-900">
                                        admin
                                    </span>
                                )}
                                {comment.is_pinned && (
                                    <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-amber-900 dark:bg-amber-700/60 dark:text-amber-100">
                                        sabit
                                    </span>
                                )}
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                    {formatDate(comment.created_at)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                <button
                                    type="button"
                                    onClick={() => toggleLike(comment.id)}
                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 transition ${
                                        comment.liked
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                                    }`}
                                >
                                    <span>❤</span>
                                    <span>{comment.likes_count}</span>
                                </button>
                                {repliesEnabled && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            replyingTo === comment.id ? setReplyingTo(null) : openReplyForm(comment.id)
                                        }
                                        className="rounded-full bg-gray-100 px-3 py-1 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                                    >
                                        Yanıtla
                                    </button>
                                )}
                            </div>
                            {repliesEnabled && replyingTo === comment.id && (
                                <form onSubmit={handleReplySubmit} className="mt-4 space-y-3">
                                    {honeypot?.enabled && (
                                        <>
                                            <input
                                                type="text"
                                                name={honeypot.nameFieldName}
                                                value={replyForm.data[honeypot.nameFieldName] || ''}
                                                onChange={(event) =>
                                                    replyForm.setData(honeypot.nameFieldName, event.target.value)
                                                }
                                                className="hidden"
                                                autoComplete="off"
                                                tabIndex="-1"
                                            />
                                            <input
                                                type="hidden"
                                                name={honeypot.validFromFieldName}
                                                value={replyForm.data[honeypot.validFromFieldName] || ''}
                                            />
                                        </>
                                    )}
                                    {isGuest && (
                                        <div className="grid gap-3 md:grid-cols-2">
                                            <input
                                                type="text"
                                                placeholder="İsim"
                                                value={replyForm.data.name}
                                                onChange={(event) => replyForm.setData('name', event.target.value)}
                                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                            />
                                            <input
                                                type="email"
                                                placeholder="E-posta"
                                                value={replyForm.data.email}
                                                onChange={(event) => replyForm.setData('email', event.target.value)}
                                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                            />
                                        </div>
                                    )}
                                    <textarea
                                        rows="3"
                                        value={replyForm.data.text}
                                        onChange={(event) => replyForm.setData('text', event.target.value)}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                    {replyForm.errors.text && (
                                        <p className="text-xs text-red-500">{replyForm.errors.text}</p>
                                    )}
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setReplyingTo(null)}
                                            className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300"
                                        >
                                            Vazgeç
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={replyForm.processing}
                                            className="rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            Yanıtla
                                        </button>
                                    </div>
                                </form>
                            )}
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-5 space-y-4 border-l border-gray-200 pl-4 dark:border-gray-700">
                                    {comment.replies.map((reply) => (
                                        <div key={reply.id} className="flex gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                                {reply.commenter?.photo ? (
                                                    <img
                                                        src={reply.commenter.photo}
                                                        alt={reply.commenter?.name || 'Guest'}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    buildInitials(reply.commenter?.name)
                                                )}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                                                        {reply.commenter?.name || 'Ziyaretçi'}
                                                    </p>
                                                    {reply.commenter?.is_admin && (
                                                        <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest text-white dark:bg-gray-100 dark:text-gray-900">
                                                            admin
                                                        </span>
                                                    )}
                                                    <span className="text-[0.7rem] text-gray-400 dark:text-gray-500">
                                                        {formatDate(reply.created_at)}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-700 dark:text-gray-300">{reply.text}</p>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleLike(reply.id)}
                                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] transition ${
                                                        reply.liked
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                                                    }`}
                                                >
                                                    <span>❤</span>
                                                    <span>{reply.likes_count}</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
