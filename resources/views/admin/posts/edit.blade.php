@extends('layouts.panel')

@section('page_title', 'Gönderi Düzenle')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <form action="{{ route('posts.update', $post->id) }}" method="POST">
                            @csrf
                            @method('PUT')

                            <!-- Post Title -->
                            <div class="mb-3">
                                <label class="form-label">Başlık</label>
                                <input type="text" name="post_title" id="post_title" class="form-control" oninput="generateSlug()" value="{{ old('post_title', $post->post_title) }}">
                            </div>

                            <!-- Type Selection -->
                            <div class="mb-3">
                                <label class="form-label">Tür</label>
                                <select name="type" id="type" class="form-select" onchange="toggleFieldsBasedOnType()">
                                    <option value="0" {{ $post->type !== 0 ?: 'selected' }}>Gönderi</option>
                                    <option value="1" {{ $post->type !== 1 ?: 'selected' }}>Görsel</option>
                                    <option value="2" {{ $post->type !== 2 ?: 'selected' }}>Tasarım/Çizim</option>
                                </select>
                            </div>

                            <!-- Slug (Hidden if type is 1 or 2) -->
                            <div class="mb-3" id="slug-section">
                                <label class="form-label">Slug</label>
                                <input type="text" name="post_slug" id="post_slug" class="form-control" value="{{ old('post_slug', $post->post_slug) }}">
                            </div>

                            <div class="mb-3" id="content-section">
                                <label class="form-label">İçerik</label>
                                <x-MarkdownEditor name="content" :value="old('post_content', $post->post_content)" />
                            </div>

                            <!-- Description (Hidden if type is 1 or 2) -->
                            <div class="mb-3" id="description-section">
                                <label class="form-label">Açıklama</label>
                                <textarea id="description" name="description" class="form-control" rows="3" placeholder="Enter description...">
                                    {{ old('description', $post->description) }}
                                </textarea>
                            </div>

                            <!-- Tags (Hidden if type is 1 or 2) -->
                            <div class="mb-3" id="tags-section">
                                <label class="form-label">Etiketler</label>
                                <input type="text" name="post_tags" id="post_tags" class="form-control" placeholder="Enter tags..." value="{{ old('post_tags', json_encode($post->post_tags)) }}">
                            </div>

                            <div class="mb-3" id="url-section">
                                <label class="form-label">Görsel</label>
                                <input type="text" name="post_image" id="url" class="form-control" placeholder="Enter image or design URL" value="{{ old('post_image', $post->post_image) }}">
                            </div>

                            <div class="mb-3" id="status-section">
                                <label class="form-label">Durum</label>
                                <select name="post_status" class="form-select">
                                    <option value="draft" {{ $post->post_status !== 'draft' ?: 'selected' }}>Taslak</option>
                                    <option value="published" {{ $post->post_status !== 'published' ?: 'selected' }}>Yayımla</option>
                                </select>
                            </div>

                            <!-- Category Selection Modal Trigger -->
                            <div class="mb-3">
                                <label class="form-label">Category</label>
                                <button type="button" class="btn btn-primary" onclick="showCategoryModal()">Select Category</button>
                                <input type="hidden" name="post_category_id" id="selected_category_id" value="{{ old('post_category_id', $post->post_category_id) }}">
                                <div id="selected_category_name" class="mt-2">Selected Category: {{ $post->category()->name ?? 'None' }}</div>
                            </div>

                            <button type="submit" class="btn btn-primary">Güncelle</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('partials._category')

    <script>
        // Initialize Tagify for the post_tags input with custom settings
        var input = document.querySelector('input[name=post_tags]');
        var tagify = new Tagify(input, {
            whitelist: ["Laravel", "PHP", "JavaScript"], // Tag suggestions
            maxTags: 10, // Limit the number of tags
            dropdown: {
                maxItems: 20, // Max items in dropdown
                classname: "tags-look", // Custom class for dropdown
                enabled: 0, // Always show suggestions dropdown
            }
        });

        // Function to toggle fields based on the selected type
        function toggleFieldsBasedOnType() {
            var type = document.getElementById('type').value;

            var slugSection = document.getElementById('slug-section');
            var contentSection = document.getElementById('content-section');
            var descriptionSection = document.getElementById('description-section');
            var tagsSection = document.getElementById('tags-section');
            var urlSection = document.getElementById('url-section');
            var statusSection = document.getElementById('status-section');
            var categorySection = document.getElementById('category-section');

            if (type == '1' || type == '2') {
                // Show URL field, hide other sections except the title
                slugSection.style.display = 'none';
                contentSection.style.display = 'none';
                descriptionSection.style.display = 'none';
                tagsSection.style.display = 'none';
                urlSection.style.display = 'block';
                categorySection.style.display = 'none';
            } else {
                // Show all sections (except the URL field)
                slugSection.style.display = 'block';
                contentSection.style.display = 'block';
                descriptionSection.style.display = 'block';
                tagsSection.style.display = 'block';
                urlSection.style.display = 'block';
                statusSection.style.display = 'block';
                categorySection.style.display = 'block';
            }
        }

        // Function to generate a slug from the post title and replace Turkish characters
        function generateSlug() {
            let title = document.getElementById('post_title').value;

            // Turkish character replacements
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
            document.getElementById('selected_category_name').textContent = 'Seçili Kategori: ' + name;
            var categoryModal = bootstrap.Modal.getInstance(document.getElementById('categoryModal'));
            categoryModal.hide();
        }



        // Initial toggle when the page loads
        document.addEventListener('DOMContentLoaded', function() {
            toggleFieldsBasedOnType();
        });

    </script>
@endsection
