@extends('layouts.panel')

@section('page_title', 'Şiirlerim')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Tüm Şiirler</h3>
                        <div class="card-actions">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPoemModal">
                                Yeni Şiir
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table mt-4">
                            <thead>
                            <tr>
                                <th>Başlık</th>
                                <th>Slug</th>
                                <th>Durum</th>
                                <th>Yazış Tarihi</th>
                                <th>..</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($poems as $poem)
                                <tr id="poemRow{{ $poem->id }}">
                                    <td>{{ $poem->title }}</td>
                                    <td>{{ $poem->slug }}</td>
                                    <td><span class="badge {{ $poem->status->color() }}">{{ $poem->status->label() }}</span></td>
                                    <td>{{ $poem->wrote_at }}</td>
                                    <td>
                                        <button class="btn btn-warning" data-id="{{ $poem->id }}" data-bs-toggle="modal" data-bs-target="#editPoemModal" onclick="fetchPoem({{ $poem->id }})">
                                            Düzenle
                                        </button>
                                        <button class="btn btn-danger" onclick="deletePoem({{ $poem->id }})">Sil</button>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>

                        <!-- Add Poem Modal -->
                        <div class="modal fade" id="addPoemModal" tabindex="-1" aria-labelledby="addPoemModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Yeni Şiir</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form id="addPoemForm">
                                        @csrf
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="title" class="form-label">Başlık</label>
                                                <input type="text" class="form-control" id="add_title" name="title" required onkeyup="generateSlug('add_title', 'add_slug')">
                                            </div>
                                            <div class="mb-3">
                                                <label for="slug" class="form-label">Slug</label>
                                                <input type="text" class="form-control" id="add_slug" name="slug" readonly>
                                                <small class="form-hint">Bu slug tahmini üretilir.</small>
                                            </div>
                                            <div class="mb-3">
                                                <label for="content" class="form-label">Şiir</label>
                                                <textarea class="form-control" id="add_content" name="content" rows="3" required></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label for="status" class="form-label">Durum</label>
                                                <select class="form-select" id="add_status" name="status" required>
                                                    <option value="published">Paylaş</option>
                                                    <option value="draft">Taslak</option>
                                                    <option value="trash">Çöp</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="wrote_at" class="form-label">Yazılış Tarihi</label>
                                                <input type="datetime-local" class="form-control" id="add_wrote_at" name="wrote_at" required>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                                            <button type="button" class="btn btn-primary" onclick="addPoem()">Kaydet</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <!-- Edit Poem Modal -->
                        <div class="modal fade" id="editPoemModal" tabindex="-1" aria-labelledby="editPoemModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Şiiri Düzenle</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form id="editPoemForm">
                                        @csrf
                                        @method('PUT')
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="title" class="form-label">Başlık</label>
                                                <input type="text" class="form-control" id="edit_title" name="title" required onkeyup="generateSlug('edit_title', 'edit_slug')">
                                            </div>
                                            <div class="mb-3">
                                                <label for="slug" class="form-label">Slug</label>
                                                <input type="text" class="form-control" id="edit_slug" name="slug" readonly>
                                                <small class="form-hint">Bu slug tahmini üretilir.</small>
                                            </div>
                                            <div class="mb-3">
                                                <label for="content" class="form-label">Şiir</label>
                                                <textarea class="form-control" id="edit_content" name="content" rows="3" required></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label for="status" class="form-label">Durum</label>
                                                <select class="form-select" id="edit_status" name="status" required>
                                                    <option value="published">Paylaş</option>
                                                    <option value="draft">Taslak</option>
                                                    <option value="trash">Çöp</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="wrote_at" class="form-label">Yazılış Tarihi</label>
                                                <input type="datetime-local" class="form-control" id="edit_wrote_at" name="wrote_at" required>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                                            <button type="button" class="btn btn-primary" onclick="updatePoem()">Kaydet</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <script>
        function generateSlug(titleId, slugId) {
            let title = $('#' + titleId).val();
            let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            $('#' + slugId).val(slug);
        }

        function fetchPoem(id) {
            $.ajax({
                url: './poems/' + id,
                method: 'GET',
                success: function(poem) {
                    $('#edit_title').val(poem.title);
                    $('#edit_slug').val(poem.slug);
                    $('#edit_content').val(poem.content);
                    $('#edit_status').val(poem.status);
                    $('#edit_wrote_at').val(poem.wrote_at);
                    $('#editPoemForm').attr('action', 'admin/poems/' + poem.id);
                },
                error: function() {
                    Swal.fire('Error', 'Could not fetch poem data.', 'error');
                }
            });
        }

        function updatePoem() {
            let formData = $('#editPoemForm').serialize();
            let actionUrl = $('#editPoemForm').attr('action');
            $.ajax({
                url: actionUrl,
                method: 'PUT',
                data: formData,
                success: function(response) {
                    Swal.fire('Success', response.message, 'success');
                    setTimeout(function() {
                        location.reload(); // Reload page to show updated poem
                    }, 1500);
                },
                error: function(xhr) {
                    Swal.fire('Error', 'There was a problem updating the poem.', 'error');
                }
            });
        }

        function addPoem() {
            let formData = $('#addPoemForm').serialize();
            $.ajax({
                url: '{{ route('poems.store') }}',
                method: 'POST',
                data: formData,
                success: function(response) {
                    Swal.fire('Success', response.message, 'success');
                    setTimeout(function() {
                        location.reload(); // Reload page to show new poem
                    }, 1500);
                },
                error: function(xhr) {
                    Swal.fire('Error', 'There was a problem adding the poem.', 'error');
                }
            });
        }
    </script>
@endsection
