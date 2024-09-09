<?php

namespace Database\Seeders;

use App\Models\TechStack;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TechStackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $techs = [
            "Bash" => 2014,
            "Bootstrap" => 2015,
            "JavaScript" => 2011,
            "Sass" => 2018,
            "JQuery" => 2013,
            "Git" => 2017,
            "Electron" => 2019,
            "FastAPI" => 2019,
            "MongoDB" => 2019,
            "Svelte" => 2020,
            "SQLite" => 2016,
            "TypeScript" => 2019,
            "DiscordBots" => 2019,
            "HTML" => 2011,
            "Django" => 2021,
            "Wordpress" => 2016,
            "QT" => 2021,
            "Symfony" => 2016,
            "Github" => 2016,
            "Redis" => 2020,
            "PostgreSQL" => 2020,
            "RabbitMQ" => 2021,
            "Laravel" => 2017,
            "MySQL" => 2010,
            "Python" => 2018,
            "NodeJS" => 2019,
            "PHP" => 2010,
            "Vite" => 2020,
            "VueJS" => 2020,
            "Markdown" => 2019,
            "Less" => 2016,
            "Yarn" => 2021,
            "Flask" => 2019,
            "ExpressJS" => 2020,
            "Nginx" => 2022,
            "Regex" => 2013,
            "Tauri" => 2023,
            "GTK" => 2021,
            "Webpack" => 2022,
            "TailwindCSS" => 2021,
            "Debian" => 2015,
            "Postman" => 2019,
            "Photoshop" => 2013,
            "Vercel" => 2020,
            "Ubuntu" => 2015,
            "PhpStorm" => 2018,
            "PyCharm" => 2018
        ];

        $tech_cat = [
            "Bash" => 1,
            "Bootstrap" => 1,
            "JavaScript" => 1,
            "Sass" => 1,
            "JQuery" => 1,
            "Git" => 1,
            "Electron" => 1,
            "FastAPI" => 1,
            "MongoDB" => 1,
            "Svelte" => 1,
            "SQLite" => 1,
            "TypeScript" => 1,
            "DiscordBots" => 1,
            "HTML" => 1,
            "Django" => 1,
            "Wordpress" => 1,
            "QT" => 1,
            "Symfony" => 1,
            "Github" => 1,
            "Redis" => 1,
            "PostgreSQL" => 1,
            "RabbitMQ" => 1,
            "Laravel" => 1,
            "MySQL" => 1,
            "Python" => 1,
            "NodeJS" => 1,
            "PHP" => 1,
            "Vite" => 1,
            "VueJS" => 1,
            "Markdown" => 1,
            "Less" => 1,
            "Yarn" => 1,
            "Flask" => 1,
            "ExpressJS" => 2,
            "Nginx" => 2,
            "Regex" => 2,
            "Tauri" => 2,
            "GTK" => 2,
            "Webpack" => 2,
            "TailwindCSS" => 2,
            "Debian" => 3,
            "Postman" => 3,
            "Photoshop" => 3,
            "Vercel" => 3,
            "Ubuntu" => 3,
            "PhpStorm" => 3,
            "PyCharm" => 3
        ];

        $directoryPath = public_path('assets/icons'); 
        $folders = ['solids', 'light'];

        foreach ($folders as $folder) {
            $folderPath = $directoryPath . '/' . $folder;

            if (File::exists($folderPath)) {
                $files = File::files($folderPath);

                foreach ($files as $file) {

                    if ($file->getExtension() === 'svg') {
                        $filename = pathinfo($file, PATHINFO_FILENAME);

                        if (array_key_exists($filename, $techs)) {
                            TechStack::create([
                                'name' => $filename,
                                'icon_type' => $folder !== 'light' ? 'withoutdm' : 'wdm',
                                'icon_name' => $filename,
                                'start_year' => $techs[$filename],
                                'status' => $tech_cat[$filename]
                            ]);
                        }
                    }
                }
            }
        }
    }
}
