import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('admin.profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    const formInputClass =
        'mt-1 block w-full rounded-md border-input shadow-sm focus:border-ring focus:ring-ring dark:bg-secondary dark:border-border dark:text-foreground sm:text-sm';

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-foreground dark:text-foreground">Hesabı Sil</h2>

                <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                    Hesabınız silindiğinde, tüm kaynakları ve verileri kalıcı olarak silinecektir. Hesabınızı silmeden
                    önce, lütfen saklamak istediğiniz verileri veya bilgileri indirin.
                </p>
            </header>

            <button
                className="inline-flex items-center rounded-md border border-transparent bg-destructive px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-red-300 transition duration-150 ease-in-out hover:bg-destructive focus:border-red-900 focus:outline-none focus:ring active:bg-red-900 disabled:opacity-25"
                onClick={confirmUserDeletion}
            >
                Hesabı Sil
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-foreground dark:text-foreground">
                        Hesabınızı silmek istediğinizden emin misiniz?
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                        Hesabınız silindiğinde, tüm kaynakları ve verileri kalıcı olarak silinecektir. Lütfen hesabınızı
                        kalıcı olarak silmek istediğinizi onaylamak için şifrenizi girin.
                    </p>

                    <div className="mt-6">
                        <label htmlFor="password" className="sr-only">
                            Şifre
                        </label>

                        <input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className={formInputClass}
                            placeholder="Şifre"
                        />

                        {errors.password && <div className="mt-2 text-xs text-destructive">{errors.password}</div>}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-input bg-card px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground shadow-sm transition duration-150 ease-in-out hover:bg-secondary/70 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-25 dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:bg-secondary dark:focus:ring-offset-gray-800"
                            onClick={closeModal}
                        >
                            İptal
                        </button>

                        <button
                            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-destructive px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-red-300 transition duration-150 ease-in-out hover:bg-destructive focus:border-red-900 focus:outline-none focus:ring active:bg-red-900 disabled:opacity-25"
                            disabled={processing}
                        >
                            Hesabı Sil
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
