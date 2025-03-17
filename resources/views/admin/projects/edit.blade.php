@extends('layouts.panel')
@section('content')
    <div class="page-header mb-4">
        <div class="row align-items-center">
            <div class="col">
                <h2 class="page-title">Proje Düzenle</h2>
                <div class="text-muted mt-1">{{ $project->title }}</div>
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

    <form action="{{ route('admin.projects.update', $project) }}" method="POST" enctype="multipart/form-data" class="card">
        @csrf
        @method('PUT')
        <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label class="form-label required">Proje Başlığı</label>
                        <input type="text" class="form-control @error('title') is-invalid @enderror" name="title" value="{{ old('title', $project->title) }}" required>
                        @error('title')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label required">Açıklama</label>
                        <input type="text" class="form-control @error('description') is-invalid @enderror" name="description" value="{{ old('description', $project->description) }}" required>
                        @error('description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <small class="form-hint">Kısa bir açıklama (SEO için de kullanılacak)</small>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">İçerik</label>
                        <textarea class="form-control @error('content') is-invalid @enderror" name="content" rows="10">{{ old('content', $project->content) }}</textarea>
                        @error('content')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <small class="form-hint">Markdown formatında içerik yazabilirsiniz</small>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <div class="form-label">Proje Görseli</div>
                        @if($project->image)
                            <div class="mb-2">
                                <img src="{{ asset('storage/' . $project->image) }}" alt="{{ $project->title }}" class="img-thumbnail" style="max-height: 150px;">
                            </div>
                        @endif
                        <input type="file" class="form-control @error('image') is-invalid @enderror" name="image">
                        @error('image')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Proje URL</label>
                        <input type="url" class="form-control @error('url') is-invalid @enderror" name="url" value="{{ old('url', $project->url) }}">
                        @error('url')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <small class="form-hint">Projenin yayınlandığı site adresi</small>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">GitHub URL</label>
                        <input type="url" class="form-control @error('github_url') is-invalid @enderror" name="github_url" value="{{ old('github_url', $project->github_url) }}">
                        @error('github_url')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <small class="form-hint">Projenin GitHub adresi</small>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Tamamlanma Tarihi</label>
                        <input type="date" class="form-control @error('completed_at') is-invalid @enderror" name="completed_at" value="{{ old('completed_at', $project->completed_at ? $project->completed_at->format('Y-m-d') : '') }}">
                        @error('completed_at')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="is_featured" {{ old('is_featured', $project->is_featured) ? 'checked' : '' }}>
                            <span class="form-check-label">Öne Çıkan Proje</span>
                        </label>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="is_published" {{ old('is_published', $project->is_published) ? 'checked' : '' }}>
                            <span class="form-check-label">Yayınla</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer text-end">
            <button type="submit" class="btn btn-primary">Projeyi Güncelle</button>
        </div>
    </form>
@endsection
