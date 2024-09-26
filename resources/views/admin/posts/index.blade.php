@extends('layouts.panel')

@section('page_title', 'Gönderilerim')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Tüm Gönderiler</h3>
                        <div class="card-actions">
                            <a href="{{ route('posts.create') }}" class="btn btn-primary">Yeni</a>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th>Başlık</th>
                                    <th>Yazar</th>
                                    <th>Durum</th>
                                    <th>..</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($posts as $post)
                                    <tr>
                                        <td>{{ $post->post_title }}</td>
                                        <td>
                                            <span class="avatar avatar-sm">
                                                 {{ strtoupper(substr($post->post_author->name, 0, 1)) }}
                                            </span>
                                        </td>
                                        <td><span class="badge {{ $post->post_status->color() }}">{{ $post->post_status->label() }}</span></td>
                                        <td>
                                            <a href="{{ route('posts.edit', $post->id) }}" class="btn btn-warning">Düzenle</a>
                                            <button type="button" class="btn btn-danger" onclick="confirmDelete({{ $post->id }})">Sil</button>
                                            <form id="delete-form-{{ $post->id }}" action="{{ route('posts.destroy', $post->id) }}" method="POST" style="display:none;">
                                                @csrf
                                                @method('DELETE')
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        function confirmDelete(postId) {
            Swal.fire({
                title: 'Emin misin balım?',
                text: "Silersen geri getiremeyeceksin.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sil'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('delete-form-' + postId).submit();
                }
            })
        }
    </script>
@endsection
