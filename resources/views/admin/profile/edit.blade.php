@extends('layouts.panel')

@section('page_title', 'Profil Ayarları')

@section('content')
<div class="row">
    <div class="col-md-12 mb-4">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Profil Bilgileri</h3>
            </div>
            <div class="card-body">
                <form method="post" action="{{ route('profile.update') }}">
                    @csrf
                    @method('patch')

                    <div class="mb-3">
                        <label class="form-label" for="name">İsim</label>
                        <input id="name" name="name" type="text" class="form-control" value="{{ old('name', $user->name) }}" required autofocus autocomplete="name">
                        @error('name')
                            <div class="text-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="email">E-posta</label>
                        <input id="email" name="email" type="email" class="form-control" value="{{ old('email', $user->email) }}" required autocomplete="username">
                        @error('email')
                            <div class="text-danger mt-2">{{ $message }}</div>
                        @enderror

                        @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
                            <div class="mt-2">
                                <p class="text-muted">
                                    E-posta adresiniz doğrulanmamış.

                                    <form id="send-verification" method="post" action="{{ route('verification.send') }}" class="d-inline">
                                        @csrf
                                        <button type="submit" class="btn btn-link p-0 m-0 align-baseline">Doğrulama e-postasını tekrar göndermek için tıklayın.</button>
                                    </form>
                                </p>

                                @if (session('status') === 'verification-link-sent')
                                    <p class="text-success mt-2">
                                        E-posta adresinize yeni bir doğrulama bağlantısı gönderildi.
                                    </p>
                                @endif
                            </div>
                        @endif
                    </div>

                    <div class="form-footer">
                        <button type="submit" class="btn btn-primary">Kaydet</button>

                        @if (session('status') === 'profile-updated')
                            <span class="text-success ms-2">Kaydedildi.</span>
                        @endif
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="col-md-12 mb-4">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Şifre Güncelleme</h3>
            </div>
            <div class="card-body">
                <form method="post" action="{{ route('password.update') }}">
                    @csrf
                    @method('put')

                    <div class="mb-3">
                        <label class="form-label" for="current_password">Mevcut Şifre</label>
                        <input id="current_password" name="current_password" type="password" class="form-control" autocomplete="current-password">
                        @error('current_password', 'updatePassword')
                            <div class="text-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="password">Yeni Şifre</label>
                        <input id="password" name="password" type="password" class="form-control" autocomplete="new-password">
                        @error('password', 'updatePassword')
                            <div class="text-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="password_confirmation">Şifre Onayı</label>
                        <input id="password_confirmation" name="password_confirmation" type="password" class="form-control" autocomplete="new-password">
                        @error('password_confirmation', 'updatePassword')
                            <div class="text-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="form-footer">
                        <button type="submit" class="btn btn-primary">Şifreyi Güncelle</button>

                        @if (session('status') === 'password-updated')
                            <span class="text-success ms-2">Şifre güncellendi.</span>
                        @endif
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Hesabı Sil</h3>
            </div>
            <div class="card-body">
                <p class="text-muted">
                    Hesabınız silindiğinde, tüm kaynakları ve verileri kalıcı olarak silinecektir. Hesabınızı silmeden önce, lütfen saklamak istediğiniz verileri veya bilgileri indirin.
                </p>

                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-account-modal">
                    Hesabı Sil
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Delete Account Modal -->
<div class="modal modal-blur fade" id="delete-account-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Hesabınızı silmek istediğinizden emin misiniz?</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="post" action="{{ route('profile.destroy') }}">
                @csrf
                @method('delete')
                
                <div class="modal-body">
                    <p>Hesabınız silindiğinde, tüm kaynakları ve verileri kalıcı olarak silinecektir. Lütfen hesabınızı kalıcı olarak silmek istediğinizi onaylamak için şifrenizi girin.</p>
                    
                    <div class="mb-3">
                        <label class="form-label" for="delete-password">Şifre</label>
                        <input id="delete-password" name="password" type="password" class="form-control" placeholder="Şifreniz">
                        @error('password', 'userDeletion')
                            <div class="text-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-link link-secondary" data-bs-dismiss="modal">
                        İptal
                    </button>
                    <button type="submit" class="btn btn-danger ms-auto">
                        Hesabı Sil
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
