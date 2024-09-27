@extends('layouts.panel')

@section('page_title', 'Dosya Yöneticisi')

@section('content')
    <style>
        .file, .folder {
            cursor: pointer;
        }
        .selected {
            background-color: #cce5ff;
        }
        .file-meta {
            font-size: 0.85em;
            color: #6c757d;
        }
        .file img {
            border-radius: 4px;
            object-fit: cover;
        }
    </style>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/min/dropzone.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.9.2/jquery.contextMenu.min.css">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <!-- Breadcrumb -->
                        <nav aria-label="breadcrumb">
                            <ol id="breadcrumb" class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#" data-path="/"><i class="fas fa-home"></i> Root</a></li>
                            </ol>
                        </nav>

                        <form action="{{ route('admin.media.upload') }}" class="dropzone" id="file-dropzone">
                            @csrf
                        </form>

                        <div class="mt-3">
                            <input type="text" id="new-folder-name" class="form-control">
                            <button id="create-folder" class="btn btn-primary mt-2">Dizin Oluştur</button>
                        </div>

                        <div class="row mt-5">
                            <div class="col-md-12">
                                <h4>Dosya Gezgini</h4>
                                <ul id="file-folder-list" class="list-group"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/min/dropzone.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.9.2/jquery.contextMenu.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.9.2/jquery.ui.position.min.js"></script>

    <script>
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        let currentPath = '/';

        Dropzone.options.fileDropzone = {
            paramName: "file",
            maxFilesize: 10,
            init: function() {
                this.on("sending", function(file, xhr, formData) {
                    formData.append("parent_folder", currentPath);
                });
                this.on("success", function(file, response) {
                    Toastify({
                        text: "Dosya başarıyla yüklendi.",
                        duration: 3000,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        onClick: function(){} // Callback after click
                    }).showToast();
                    loadFiles(currentPath);
                });
            }
        };

        function loadFiles(path = '/') {
            $.get('{{ route('admin.media.files') }}', { folder: path }, function(response) {
                $('#file-folder-list').empty();

                response.folders.forEach(folder => {
                    const folderName = folder.name.replace(response.path + '/', '');
                    $('#file-folder-list').append(`
                <li class="list-group-item folder" data-path="${folder.name}">
                    <i class="fas fa-folder"></i> ${folderName}
                    <div class="file-meta">Type: Folder | Created: ${folder.creation_time}</div>
                </li>
            `);
                });

                response.files.forEach(file => {
                    let thumbnailHtml = '';
                    if (file.thumbnail) {
                        thumbnailHtml = `<img src="${file.thumbnail}" alt="${file.name}" style="width: 50px; height: 50px; margin-right: 10px;">`;
                    }

                    $('#file-folder-list').append(`
                <li class="list-group-item file" data-file="${file.name}" data-type="${file.type}" data-size="${file.size}">
                    ${thumbnailHtml}
                    <i class="fas fa-file"></i> ${file.name}
                    <div class="file-meta">Type: ${file.type} | Created: ${file.creation_time}</div>
                </li>
            `);
                });

                updateBreadcrumb(response.path);
                currentPath = response.path;
            });
        }


        function updateBreadcrumb(path) {
            const parts = path.split('/');
            let fullPath = '';
            $('#breadcrumb').empty();
            $('#breadcrumb').append('<li class="breadcrumb-item"><a href="#" data-path="/"><i class="fas fa-home"></i> Root</a></li>');
            parts.forEach(part => {
                if (part) {
                    fullPath += '/' + part;
                    $('#breadcrumb').append(`<li class="breadcrumb-item"><a href="#" data-path="${fullPath}">${part}</a></li>`);
                }
            });
        }

        $(document).on('click', '.folder', function() {
            const path = $(this).data('path');
            loadFiles(path);
        });

        $(document).on('click', '#breadcrumb a', function(e) {
            e.preventDefault();
            const path = $(this).data('path');
            loadFiles(path);
        });

        $('#create-folder').click(function() {
            const folderName = $('#new-folder-name').val();
            if (folderName) {
                $.post('{{ route('admin.media.createFolder') }}', {
                    folderName: folderName,
                    parent_folder: currentPath
                }, function(response) {
                    Toastify({
                        text: "Klasör Oluşturuldu.",
                        duration: 3000,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        onClick: function(){} // Callback after click
                    }).showToast();
                    loadFiles(currentPath);
                });
            }
        });

        // Handle file selection
        $(document).on('click', '.file, .folder', function() {
            $('.file, .folder').removeClass('selected');
            $(this).addClass('selected');
        });

        // Context Menu for Files
        $.contextMenu({
            selector: '.file',
            items: {
                "download": {
                    name: "İndir",
                    callback: function(key, opt) {
                        const file = opt.$trigger.data('file');
                        window.location = './download/' + file;
                    }
                },
                "delete": {
                    name: "Sil",
                    callback: function(key, opt) {
                        const file = opt.$trigger.data('file');
                        $.post('./delete', { file: file, parent_folder: currentPath }, function(response) {
                            Toastify({
                                text: "Dosya başarıyla silindi.",
                                duration: 3000,
                                close: true,
                                gravity: "top", // `top` or `bottom`
                                position: "right", // `left`, `center` or `right`
                                stopOnFocus: true, // Prevents dismissing of toast on hover
                                onClick: function(){} // Callback after click
                            }).showToast();
                            loadFiles(currentPath); // Reload after deletion
                        });
                    }
                },
                "link": {
                    name: "Bağlantısını Kopyala",
                    callback: function(key, opt) {
                        const file = opt.$trigger.data('file');
                        const fileUrl = window.location.origin + '/storage/uploads/' + file;
                        navigator.clipboard.writeText(fileUrl).then(() => {
                            Toastify({
                                text: "Dosya bağlantısı kopyalandı.",
                                duration: 3000,
                                close: true,
                                gravity: "top", // `top` or `bottom`
                                position: "right", // `left`, `center` or `right`
                                stopOnFocus: true, // Prevents dismissing of toast on hover
                                onClick: function(){} // Callback after click
                            }).showToast();
                        });
                    }
                }
            }
        });

        loadFiles();
    </script>
@endsection
