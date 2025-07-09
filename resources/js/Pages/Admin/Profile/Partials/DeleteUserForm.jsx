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

    const formInputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 sm:text-sm";

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Hesabı Sil</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Hesabınız silindiğinde, tüm kaynakları ve verileri kalıcı olarak silinecektir. Hesabınızı silmeden önce, lütfen saklamak istediğiniz verileri veya bilgileri indirin.
                </p>
            </header>

            <button className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150" onClick={confirmUserDeletion}>Hesabı Sil</button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Hesabınızı silmek istediğinizden emin misiniz?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Hesabınız silindiğinde, tüm kaynakları ve verileri kalıcı olarak silinecektir. Lütfen hesabınızı kalıcı olarak silmek istediğinizi onaylamak için şifrenizi girin.
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

                        {errors.password && <div className="text-red-500 mt-2 text-xs">{errors.password}</div>}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button type="button" className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 dark:bg-gray-800 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800" onClick={closeModal}>İptal</button>

                        <button className="ml-3 inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150" disabled={processing}>
                            Hesabı Sil
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
