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
        'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 sm:text-sm';

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Hesabı Sil</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Hesabınız silindiğinde, tüm kaynakları ve verileri kalıcı olarak silinecektir. Hesabınızı silmeden
                    önce, lütfen saklamak istediğiniz verileri veya bilgileri indirin.
                </p>
            </header>

            <button
                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-red-300 transition duration-150 ease-in-out hover:bg-red-700 focus:border-red-900 focus:outline-none focus:ring active:bg-red-900 disabled:opacity-25"
                onClick={confirmUserDeletion}
            >
                Hesabı Sil
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Hesabınızı silmek istediğinizden emin misiniz?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
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

                        {errors.password && <div className="mt-2 text-xs text-red-500">{errors.password}</div>}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
                            onClick={closeModal}
                        >
                            İptal
                        </button>

                        <button
                            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-red-300 transition duration-150 ease-in-out hover:bg-red-700 focus:border-red-900 focus:outline-none focus:ring active:bg-red-900 disabled:opacity-25"
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
