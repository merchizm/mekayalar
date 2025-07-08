<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class PoemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $table = DB::table('poems');
        $table->truncate();

        $data = [
            [
                'title'   => 'Gemi',
                'slug'    => 'gemi',
                'content' => 'İçim olmuş kıyıya vuran gemi
İçim-içim kayalıklara dağılmış
Hislerim, ağır yaralanmış düşlerim
destek etmişler kanayan yaraya

Ağlamış bu filmi izleyen için-için
İsyan etmiş dalgaların haline
Hislerim, ağır yaralanmış düşlerim
Üzülmüş kıyının acımadığı gemiye',
                'wrote_at' => Carbon::createFromDate(2020,10,16),
            ],
            [
                'title'   => 'Son Pişmanlık',
                'slug'    => 'son-pismanlik',
                'content' => 'Kalbimin cehennem kapısının
Çanları çaldı bu gece
Beraat ediyorum kendime attığım iftiralardan
Kilit vuruyorum düşüncelerime

Kabusum oluyorum
Çöküyorum bir gölge gibi üzerime/üstüme
Nefes almadan önce düşünüyorum
Nefes aldıkça izmarite yaklaştığımdan

Yolumda koşarken adım adım
Özgürlüğe, bir an için duraksıyorum
Gördüğüm elinde balon olan bir çocuk
Dönüp gülümsedi bana sonra bir ses',
                'wrote_at' => Carbon::createFromDate(2020,10,16),
            ],
            [
                'title'   => 'Muhtaç',
                'slug'    => 'muhtac',
                'content' => 'Bir yetimin askıdaki ekmeği
Istemesi gibi senden sevgi dilenişim.
Sıcaklığına muhtaç,
Aşkına gizlice hayranım.

Dilim varmaz senden o
Sıcaklığı ve şevkati istemeye
Gözlerim varmaz,
Senin sokaklarında gezmeye

Korkarım, sevdamdan
Gün olur seni kaybedeceğim diye
O yüzden izlerim seni
Uzaktan muhtaç bir şekilde',
                'wrote_at' => Carbon::createFromDate(2020, 10, 16),
            ],
            [
                'title'   => 'Mektup',
                'slug'    => 'mektup',
                'content' => 'Cümlelerimin anlam kazanması için
Kaç ölüm gerekir bu distopik alemde
Daha ne kadar tutsağı olmalıyım
O lanetli saçların ve dudakların

Yalvarırken sonsuzluğa senin için
Her dokunuşunda bir umut sönen tenim
Sonsuzluk dahil umutsuzca bakar
Bu yalvarışın varoluşsal sancısından',
                'wrote_at' => Carbon::createFromDate(2020, 10, 16),
            ],
            [
                'title'   => 'untitled',
                'slug'    => 'untitled',
                'content' => 'Gözlerinde ki kaybolan denizcilerin
Hangi okyanusa karşı geldiğini söyle bana
Söyle ki oracıkta kendimi bırakayım
Senin içine işleyeyim, karışayım

Dalgaların narince okşasın yanaklarımı
Canın can katsın eksik olan parçama
Sarmalasın beni o bitmez tufanların
Bırakmasın o derin mavi, benliğimi

Ne demiştim ? Evet, gözlerin..

',
                'wrote_at' => Carbon::createFromDate(2020, 10, 16),
            ],
            [
                'title'   => 'Kış',
                'slug'    => 'kis',
                'content' => 'Eldivenlerim gizleyememiş, parmaklarımdaki kokan zehri,
Sevememişim kışın soğuğunu, yaktığı yanaklarımı,
Kuşların habersiz tavırlarından göç edişini, hiç sevememişim.
Kar yağmayan, içimi acıtan ve alnımı terleten kışı hiç sevmemişim.',
                'wrote_at' => Carbon::createFromDate(2020, 10, 16),
            ],
            [
                'title'   => 'Özgürlük',
                'slug'    => 'ozgurluk',
                'content' => 'Pişman olurum ağlarken sildiğim göz yaşlarımdan.
Üzülürüm israftan elimi yüzümü silmekten kağıtlara.
Fakat atacak yol yordam yoktur ağlamak dışında,
Bu birikmiş, ve kırılgan olduğunca acı duyguları.

İsyanlarım sessizdir benim, bir küçük kasabada,
Küçük bir işletmenin önündeki kaldırımı sahiplenir,
Ve ağlayarak bütünleşmekle son bulur varlığım.

Hislerim yağmur olup yağar üzerime, içim kanar
Karton duvarlarım ise erir üstüme, çöker boğar beni.
Parçalanırım hislerimin bana açtığı yolda, yaram kanar.
Bir ışık ararım, o ışık elimi yakar küserim zamana.

Boğulduğum his yağmurunda, duygularıma hiç
Ama hiç istemeyeceğim kadar tutsak ve muhtaç
Yapamam, dileyemem daha da merhamet, kırılırım
Yeni bir duvar malzemesi ararım kendime, sağlam

Duaları kullanırım, bilmediğim şeyden istek
Ummadığım yerden ise bir kılıç kesiği yerim,
Yaramın kanaması durmadan yeni bir yaram,
Yeni parçalarım olur, toparlayamam, çarparım

İçimde bir savaş çıkar, kız kulesi gözetmen,
Galata ise hapis olur bana, gardiyan hislerim
Yağmura karşı çıkamaz düşüncelerim, korkar.
Dayanamaz dahada yalnızlığa içimdeki kuşlar.

Kanatları kırık, göçe mecbur, umuda yoksun
Her akşam hislerimle beslediğim kuşlarım
Tek tek ölür, ellerimde yetiştirdiğim o kuşlar.
Yas olur içim dışımda beyaza, benden uzak olan beyaza.',
                'wrote_at' => Carbon::createFromDate(2020, 10, 16),
            ],
            [
                'title'   => 'Ayrı An',
                'slug'    => 'ayri-an',
                'content' => '1:An

Hissiz bir parmağın her hangi tene değmesi,
Dilimde güller açan kelimelerin sana varışı.
2:An

Hani titizsin hayatta, yanına uğrayacağım diye
Çamurlara basmadan önüme taş atmak gibi.
3:An

Duyman için sebepsiz bataklığa iten çırpınışlar,
Bakışındaki okun zehirinin etkisi.',
                'wrote_at' => Carbon::createFromDate(2020, 10, 16),
            ],
            [
                'title'   => 'Cana Batan Gemi',
                'slug'    => 'cana-batan-gemi',
                'content' => 'Bilmediğim rotasyona giden, unuttuğum gemi batmış.
Bunu duyanlar bana hep hayretle ve acıyarak bakmış,
Bira şişelerinin içindeki gemilerim, o kadarcık suda batmış,
Islanmış ve paramparça, yüreğim gibi hasar alıvermiş.

Sis diye bahaneyle çarpılan dağa kurban gitmiş düşlerim.
Ben yamaçta ölmüşüm, hislerim göğe kök salmış, sarmış,
O güzel pamuk gibi bulutların yakasına yapışmış, kırmış.
Kırılan bulut yine beni ıslatmış, yine ben parçalanmışım.

Hiç etmiş o maviliğini ve derinliğini, ben ise kaybolmuşum,
Onun için atıldığım bu yolda, eser kalmamış beyazlığından,
Kaybetmiş sade benim gördüğüm değerleri, artık bana sıradan,
Kırılmamışım, bulmuşum soluğumu o uzaklara giden gemiyle.',
                'wrote_at' => Carbon::createFromDate(2020, 10, 16),
            ],
            [
                'title'   => 'aşk',
                'slug'    => 'ask',
                'content' => 'İnsanlar mı?

Aynı insanların başka insanlarla yaşadığı aynı mutluluklar,
Kırılgan bir camda yürüyen geçmişin yaşattığı aynı dünler,
Sevmeyi farklı bardaktan su içmek sanan yüzler.
Sen mi?

Kırılgan, kedi kendisini sevdirince yeşeren çiçekler.',
                'wrote_at' => Carbon::createFromDate(2020, 10, 16),
            ],
            [
                'title'   => 'Eigengrau',
                'slug'    => 'eigengrau',
                'content' => 'Aradığım maviliği, her gece daldığım,
Masanın yan tarafındaki boşlukta buldum.
Her dalışımda bir kaç insan öldü içimde,
Tanrıları ise ben, reenkarnasyon uygun gördük.

Sürekli aynı iki kişi, farklı kalıplar farklı düşünceler.
Onlara bir dert, benden hallice, hala çözemediler.
Gözlerimde her ikisinin de aynı karede ölüşü,
Kulağımda ise geride kalanlardan ağlama çınları.

Zor ki, bir beyaz kadar siyahın içinde mavi olmak,
Narin ve hissedilmeden, o soğuğa dalmak.
Gözler mühürlü bu denizde, dil suskun fakat
Hele beyin, işte oradan umutsuzluklar, hatıralar.',
                'wrote_at' => Carbon::createFromDate(2020, 10, 16),
            ],
            [
                'title'   => 'Bakırköy',
                'slug'    => 'bakirkoy',
                'content' => 'Beni bağışlayın, sizin için delirseydim,
Fark eder miydiniz, tırnaklarımın kırıldığını ?
Merak eder miydiniz, ne sebeple kırıldığını ?

Ben ise ağlayarak, kanayan parmaklarıma teselli,
Gösterirdim onlara sizi resmettiğim duvarı.

Beni bağışlayın, o zaman anlar mıydınız,
Sezer miydiniz, içimdeki acıların inşa ettiği,
Sizden bir tutam alınmışçasına o mutluluğu ?

Hayır, kendimi acındırmak için değil çabam,
Demek anlamazdınız sizde kuşun kanadından.',
                'wrote_at' => Carbon::createFromDate(2020, 10, 16),
            ],
            [
                'title'   => 'untitled',
                'slug'    => 'untitled-1',
                'content' => 'İlk günaydını güneşin bizim olduğumuz yere,
Her şey maviyken kaybetmemiz için derinliğini,
Süzülmemiz aşağı doğru, orantısız ve uzaklara,
Tadılmayanı tatmayı ummak birbirimize uzakta

Bir gülün rengarenk iki yaprağı gibi, yaşantımız
Yakın olduğumuz kadar birbirimize bir o kadar uzakta
Bir yolun iki ayrımı, iki yol farklı yöne gitse de,
iki ayrım birleşip tek yok olsa da başlayamamak yola, biz',
                'wrote_at' => Carbon::createFromDate(2020, 10, 16),
            ],
            [
                'title'   => '18. Sone',
                'slug'    => '18-sone',
                'content' => 'Bir gecenin sessizliği gibi içimde,
Dudaklarımda sızlayan bir özlem,
Yıldızların titrek ışığı altında,
Bir gülüş arayışı, bir umut izi.

Gözlerinde kaybolan denizcilerin,
Hangi rüyalarla denize açıldığını anlatsana,
Kelimelerin kifayetsiz kaldığı anlarda,
Sessizce hayatın en derin sırlarına yaklaşırım.

Ruhumun kıyısında dans eden anılar,
Gözlerinin derinliklerinde yankılanır,
Bir hüzün çiçeği misali açar,
Bir sevda şarkısı, bir ömür boyu sürer.',
                'wrote_at' => Carbon::createFromDate(2023, 8, 31),
            ],
            [
                'title'   => 'Son Pişmanlık Revize',
                'slug'    => 'son-pismanlik-revize',
                'content' => 'Gecenin sessizliğinde çırpınan kanatlarım,
Cehennem kapısının çanlarına eşlik ediyor.
Kendime itiraf ediyorum yorgunluğumu,
Düşüncelerimin zincirini kırıp savruluyorum.

Bir gölge gibi çöker üzerime kabuslar,
Nefes almadan önce düşünürüm her adımı.
İzmaritin dumanında kaybolurken umutlarım,
Özgürlüğe doğru koşarken duraksarım bir an.',
                'wrote_at' => Carbon::createFromDate(2023, 8, 31),
            ],
            [
                'title'   => 'Çok saçma',
                'slug'    => 'cok-sacma',
                'content' => 'Içimdeki fabrikaların borularından
Simsiyah ve kirli dumanlar, yükselirken tek yaptığım
Kömürü artırmak çok saçma

Kirlenen havayı umursamadan
Kendime acımadan, yok sayarak
Sadece an için yaşamak, Geleceği düşünmemek çok saçma',
                'wrote_at' => Carbon::createFromDate(2023, 9, 1),
            ],
            [
                'title'   => 'Kimse',
                'slug'    => 'kimse',
                'content' => 'Kaşımın üstündeki yara
Bakıyor aynadan adetta bana
Kıkırdayıp, gülüyor halime
Verdiğim sözlere, yaptıklarıma ',
                'wrote_at' => Carbon::createFromDate(2023, 9, 1),
            ],
            [
                'title'   => 'Şifa',
                'slug'    => 'sifa',
                'content' => 'Zamanında doktorlar bile önerirmiş sigara
Desene ölüm bile şifaymış
Acı deryasında yüzen insana',
                'wrote_at' => Carbon::createFromDate(2023, 9, 1),
            ],
            [
                'title'   => 'Umut',
                'slug'    => 'umut',
                'content' => 'Ne umutsuzcaydı size karşı o tebessümlerim, bakışlarım
Kırılgan yaprakları kalbimin, saçtığım aydınlığın temsili
Oysa düşmekteydim karanlığınıza, kayan bir yıldız gibi
O sırada hayali deli yakınlığın, siz bir solukta silmişken beni',
                'wrote_at' => Carbon::createFromDate(2023, 9, 1),
            ],
            [
                'title'   => 'Untitled',
                'slug'    => 'untitled-2',
                'content' => 'Düşüncelerimin arasında kendimi kaybetmişken,
Noktayı bulmamla küçük bir parka adımımı attım.
Kırık bankın dibinde çekirdek çöplüğüne el salladım.
Güvercinler kondu gözlerine baktım, düşlerimi ufalayıp attım.
Düşlerim çiğnenmeden yutuldu, ben yine sensiz kaldım. ',
                'wrote_at' => Carbon::createFromDate(2023, 9, 1),
            ],
            [
                'title'   => 'Untitled',
                'slug'    => 'untitled-3',
                'content' => 'Reflexleşmişti oysaki, her gün o gözlerinin içine dalmak.
Seninle aynı adımları tutturmak ve bozmamak için uğraşlar',
                'wrote_at' => Carbon::createFromDate(2023, 9, 1),
            ],
            [
                'title'   => 'Taslak untitled',
                'slug'    => 'taslak-untitled',
                'content' => 'Aşkın en karmaşık hali içindeyim şimdi,
Sözlerin siliniyor, yüreğim yanıyor.
Geriye sadece acı dolu anılar kaldı,
Onursuzluğun soğuk rüzgarı esiyor etrafımda.',
                'wrote_at' => Carbon::createFromDate(2023, 9, 1),
            ],
            [
                'title'   => 'Tenine düşen yağmur damlalarından korurum seni',
                'slug'    => 'tenine-dusen-yagmur-damlalarindan-korurum-seni',
                'content' => 'Tenine düşen yağmur damlalarından korurum seni,
Gizlice süzülen her damla, sevgimle birleşir belki.
Bir perde gibi örterim seni ıslak öpücüklerle,
Gökyüzünden süzülen aşkla sararım seni.

Bulutların melodisini dinlerken kulakların,
Sensiz bir damla yağmur, anlamsız gelir bana.
Rüzgarla dans eden saçların arasında,
Kalbim ritim tutar, senin için atar hâlâ.

Yağmurun serin dokunuşu gibi, içime işler sevgin,
Damla damla düşer kalbime, her an yeniden.
Gökyüzü bir tablo gibi resmeder seni,
İçimde yankılanan bir şiir gibi, adını anarım senin.',
                'wrote_at' => Carbon::createFromDate(2023, 11, 23),
            ],
        ];

        foreach ($data as $item) {
            $table->insert($item);
        }
    }
}
