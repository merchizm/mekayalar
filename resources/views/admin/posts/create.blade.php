@extends('layouts.panel')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Create Post</h3>
                    </div>
                    <div class="card-body">
                        <form id="post-form" action="{{ route('posts.store') }}" method="POST">
                            @csrf

                            <!-- Hidden field for post_id (used when saving draft or updating existing draft) -->
                            <input type="hidden" id="post_id" name="post_id" value="{{ $post->id ?? '' }}">

                            <!-- Post Title -->
                            <div class="mb-3">
                                <label class="form-label">Title</label>
                                <input type="text" name="post_title" id="post_title" class="form-control" oninput="generateSlug()">
                            </div>

                            <!-- Type Selection -->
                            <div class="mb-3">
                                <label class="form-label">Type</label>
                                <select name="type" id="type" class="form-select" onchange="toggleFieldsBasedOnType()">
                                    <option value="0">Post</option>
                                    <option value="1">Image</option>
                                    <option value="2">Design</option>
                                </select>
                            </div>

                            <!-- Slug (Hidden if type is 1 or 2) -->
                            <div class="mb-3" id="slug-section">
                                <label class="form-label">Slug</label>
                                <input type="text" name="post_slug" id="post_slug" class="form-control">
                            </div>

                            <!-- Quill Content Editor (Hidden if type is 1 or 2) -->
                            <div class="mb-3" id="content-section">
                                <label class="form-label">Content</label>
                                <div id="editor-container" style="height: 300px;"></div>
                                <input type="hidden" name="post_content" id="post_content">
                            </div>

                            <!-- Description (Hidden if type is 1 or 2) -->
                            <div class="mb-3" id="description-section">
                                <label class="form-label">Description</label>
                                <textarea id="description" name="description" class="form-control" rows="3" placeholder="Enter description..."></textarea>
                            </div>

                            <!-- Tags (Hidden if type is 1 or 2) -->
                            <div class="mb-3" id="tags-section">
                                <label class="form-label">Tags</label>
                                <input type="text" name="post_tags" id="post_tags" class="form-control" placeholder="Enter tags...">
                            </div>

                            <div class="mb-3" id="url-section">
                                <label class="form-label">URL</label>
                                <input type="text" name="post_image" id="url" class="form-control" placeholder="Enter image or design URL">
                            </div>

                            <div class="mb-3" id="status-section">
                                <label class="form-label">Status</label>
                                <select name="post_status" class="form-select">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            <!-- Hidden author field -->
                            <input type="hidden" name="author" value="{{ auth()->user()->id }}">

                            <!-- Category Selection Modal Trigger (Hidden if type is 1 or 2) -->
                            <div class="mb-3" id="category-section">
                                <label class="form-label">Category</label>
                                <button type="button" class="btn btn-primary" onclick="showCategoryModal()">Select Category</button>
                                <input type="hidden" name="post_category_id" id="selected_category_id">
                                <div id="selected_category_name" class="mt-2">Selected Category: None</div>
                            </div>

                            <button type="submit" class="btn btn-primary">Create Post</button>
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
            document.getElementById('selected_category_name').textContent = 'Selected Category: ' + name;
            var categoryModal = bootstrap.Modal.getInstance(document.getElementById('categoryModal'));
            categoryModal.hide();
        }

        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ];

        var quill = new Quill('#editor-container', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });

        document.getElementById('post-form').addEventListener('submit', function () {
            document.getElementById('post_content').value = quill.root.innerHTML;
        });


        // Initial toggle when the page loads
        document.addEventListener('DOMContentLoaded', function() {
            toggleFieldsBasedOnType();
        });

        // Auto-save timer and interval
        let autoSaveInterval = 30000; // Auto-save every 30 seconds
        let autoSaveTimer;

        // Function to auto-save the post as a draft
        function autoSaveDraft() {
            let formData = {
                _token: '{{ csrf_token() }}',
                post_id: document.getElementById('post_id').value,
                post_title: document.getElementById('post_title').value,
                type: document.getElementById('type').value,
                post_slug: document.getElementById('post_slug').value,
                post_content: quill.root.innerHTML,
                description: document.getElementById('description').value,
                post_tags: JSON.stringify(tagify.value), // Convert tagify tags to JSON
                post_image: document.getElementById('url').value,
                post_category_id: document.getElementById('selected_category_id').value
            };

            // Send AJAX request to save the draft
            $.ajax({
                url: '{{ route('posts.draft') }}',
                method: 'POST',
                data: formData,
                success: function(response) {
                    if (response.success) {
                        document.getElementById('post_id').value = response.post_id; // Update post_id if it's a new draft
                        console.log('Draft saved successfully');
                    }
                },
                error: function(xhr) {
                    console.error('Failed to save draft');
                }
            });
        }

        // Trigger auto-save at regular intervals
        document.addEventListener('DOMContentLoaded', function() {
            autoSaveTimer = setInterval(autoSaveDraft, autoSaveInterval);

            // Auto-save on changes to title, category, or content
            document.getElementById('post_title').addEventListener('input', autoSaveDraft);
            document.getElementById('description').addEventListener('input', autoSaveDraft);
            document.getElementById('selected_category_id').addEventListener('change', autoSaveDraft);
            quill.root.innerHTML.on('change', autoSaveDraft);
        });
    </script>
@endsection
