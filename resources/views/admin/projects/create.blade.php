@extends('layouts.panel')
@section('content')
    <div class="mb-4 page-header">
        <div class="row align-items-center">
            <div class="col">
                <h2 class="page-title">Yeni Proje Ekle</h2>
                <div class="mt-1 text-muted">Yeni bir proje oluşturun.</div>
            </div>
            <div class="col-auto">
                <div class="btn-list">
                    <a href="{{ route('admin.projects.index') }}" class="btn btn-secondary d-none d-sm-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l14 0"></path>
                            <path d="M5 12l6 6"></path>
                            <path d="M5 12l6 -6"></path>
                        </svg>
                        Geri Dön
                    </a>
                </div>
            </div>
        </div>
    </div>

    <form action="{{ route('admin.projects.store') }}" method="POST" class="card">
        @csrf
        <!-- write all laravel validation errors -->
        @if ($errors->any())
            <div class="alert alert-danger">
                <div class="d-flex">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 9v2m0 4v.01"></path>
                            <path d="M12 3a9 9 0 0 1 9 9a9 9 0 0 1 -9 9a9 9 0 0 1 -9 -9a9 9 0 0 1 9 -9"></path>
                        </svg>
                    </div>
                    <div>
                        <div><strong>Uyarı!</strong> Formu gönderirken bazı hatalarla karşılaşıldı.</div>
                        <ul class="mb-0 mt-1">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        @endif

        <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label class="form-label required">Proje Başlığı</label>
                        <input type="text" class="form-control @error('title') is-invalid @enderror" name="title" value="{{ old('title') }}" required>
                        @error('title')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label required">Açıklama</label>
                        <input type="text" class="form-control @error('description') is-invalid @enderror" name="description" value="{{ old('description') }}" required>
                        @error('description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <small class="form-hint">Kısa bir açıklama (SEO için de kullanılacak)</small>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">İçerik</label>
                        <x-markdown-editor name="content" :value="old('content', '')" />
                        @error('content')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <small class="form-hint">Markdown formatında içerik yazabilirsiniz</small>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label required">Proje Görseli</label>
                        <input type="text" class="form-control @error('title') is-invalid @enderror" name="image" value="{{ old('image') }}" required>
                        @error('image')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Proje URL</label>
                        <input type="url" class="form-control @error('url') is-invalid @enderror" name="url" value="{{ old('url') }}">
                        @error('url')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <small class="form-hint">Projenin yayınlandığı site adresi</small>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">GitHub URL</label>
                        <input type="url" class="form-control @error('github_url') is-invalid @enderror" name="github_url" value="{{ old('github_url') }}">
                        @error('github_url')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <small class="form-hint">Projenin GitHub adresi</small>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Tamamlanma Tarihi</label>
                        <input type="date" class="form-control @error('completed_at') is-invalid @enderror" name="completed_at" value="{{ old('completed_at') }}">
                        @error('completed_at')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="is_featured" value="true" {{ old('is_featured') ? 'checked' : '' }}>
                            <span class="form-check-label">Öne Çıkan Proje</span>
                        </label>
                    </div>

                    <div class="mb-3">
                        <label class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="is_published" value="true" {{ old('is_published', true) ? 'checked' : '' }}>
                            <span class="form-check-label">Yayınla</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer text-end">
            <button type="submit" class="btn btn-primary">Projeyi Kaydet</button>
        </div>
    </form>
@endsection
