@extends('layouts.panel')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Edit Post</h3>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('posts.update', $post->id) }}" method="POST">
                            @csrf
                            @method('PUT')

                            <div class="mb-3">
                                <label class="form-label">Title</label>
                                <input type="text" name="post_title" id="post_title" value="{{ old('post_title', $post->post_title) }}" class="form-control" oninput="generateSlug()">
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Slug</label>
                                <input type="text" name="post_slug" id="post_slug" value="{{ old('post_slug', $post->post_slug) }}" class="form-control">
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Content</label>
                                <textarea id="post_content" name="post_content" class="form-control" rows="5">{{ old('post_content', $post->post_content) }}</textarea>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Status</label>
                                <select name="post_status" class="form-select">
                                    <option value="draft" {{ $post->post_status == 'draft' ? 'selected' : '' }}>Draft</option>
                                    <option value="published" {{ $post->post_status == 'published' ? 'selected' : '' }}>Published</option>
                                </select>
                            </div>

                            <!-- Hidden author field -->
                            <input type="hidden" name="author" value="{{ $post->author }}">

                            <!-- Category Selection Modal Trigger -->
                            <div class="mb-3">
                                <label class="form-label">Category</label>
                                <button type="button" class="btn btn-primary" onclick="showCategoryModal()">Select Category</button>
                                <input type="hidden" name="post_category_id" id="selected_category_id" value="{{ old('post_category_id', $post->post_category_id) }}">
                                <div id="selected_category_name" class="mt-2">Selected Category: {{ $post->category->name ?? 'None' }}</div>
                            </div>

                            <button type="submit" class="btn btn-primary">Update Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('partials._category')

    <script>
        function generateSlug() {
            let title = document.getElementById('post_title').value;
            const turkishMap = {
                'ç': 'c', 'Ç': 'C',
                'ğ': 'g', 'Ğ': 'G',
                'ı': 'i', 'I': 'I',
                'İ': 'I', 'ö': 'o', 'Ö': 'O',
                'ş': 's', 'Ş': 'S',
                'ü': 'u', 'Ü': 'U'
            };

            let slug = title.replace(/[çÇğĞıİöÖşŞüÜ]/g, function (match) {
                return turkishMap[match];
            });

            slug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            document.getElementById('post_slug').value = slug;
        }

        function showCategoryModal() {
            var categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'), {});
            categoryModal.show();
        }

        function selectCategory(id, name) {
            document.getElementById('selected_category_id').value = id;
            document.getElementById('selected_category_name').textContent = 'Selected Category: ' + name;
            var categoryModal = bootstrap.Modal.getInstance(document.getElementById('categoryModal'));
            categoryModal.hide();
        }

        CKEDITOR.replace('post_content', {
            height: 400
        });
    </script>
@endsection
