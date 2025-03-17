@extends('layouts.panel')
@section('content')
    <div class="page-header mb-4">
        <div class="row align-items-center">
            <div class="col">
                <h2 class="page-title">Projelerim</h2>
                <div class="text-muted mt-1">Tüm projelerimi buradan yönetebilirsiniz.</div>
            </div>
            <div class="col-auto ms-auto">
                <div class="d-flex">
                    <a href="{{ route('admin.projects.create') }}" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                        Yeni Proje Ekle
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="table-responsive">
            <table class="table table-vcenter table-mobile-md card-table">
                <thead>
                    <tr>
                        <th>Proje</th>
                        <th>Durum</th>
                        <th>Özellikli</th>
                        <th>Tamamlanma Tarihi</th>
                        <th class="w-1"></th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($projects as $project)
                        <tr>
                            <td data-label="Proje">
                                <div class="d-flex py-1 align-items-center">
                                    @if ($project->image)
                                        <img src="{{ asset('storage/' . $project->image) }}" class="avatar me-2" alt="Project Image">
                                    @else
                                        <span class="avatar me-2">{{ substr($project->title, 0, 1) }}</span>
                                    @endif
                                    <div class="flex-fill">
                                        <div class="font-weight-medium">{{ $project->title }}</div>
                                        <div class="text-muted">{{ Str::limit($project->description, 60) }}</div>
                                    </div>
                                </div>
                            </td>
                            <td data-label="Durum">
                                <span class="badge {{ $project->is_published ? 'bg-success' : 'bg-danger' }}">
                                    {{ $project->is_published ? 'Yayında' : 'Taslak' }}
                                </span>
                            </td>
                            <td data-label="Özellikli">
                                <span class="badge {{ $project->is_featured ? 'bg-primary' : 'bg-secondary' }}">
                                    {{ $project->is_featured ? 'Evet' : 'Hayır' }}
                                </span>
                            </td>
                            <td data-label="Tamamlanma Tarihi">
                                {{ $project->completed_at ? $project->completed_at->format('d.m.Y') : 'Belirtilmedi' }}
                            </td>
                            <td>
                                <div class="btn-list flex-nowrap">
                                    <a href="{{ route('admin.projects.edit', $project) }}" class="btn btn-white">
                                        Düzenle
                                    </a>
                                    <div class="dropdown">
                                        <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown">
                                            İşlemler
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="{{ route('projects.show', $project) }}" target="_blank">
                                                Görüntüle
                                            </a>
                                            <form action="{{ route('admin.projects.destroy', $project) }}" method="POST" class="d-inline">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="dropdown-item text-danger" onclick="return confirm('Bu projeyi silmek istediğinize emin misiniz?')">
                                                    Sil
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="text-center">Henüz hiç proje eklenmemiş.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
