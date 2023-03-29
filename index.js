const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const finalIkiBinOnDort = fifaData.filter((ev => ev.Year == 2014 && ev.Stage == "Final"));
console.log("Görev-1-a: 2014 Dünya Kupası Finali Ev Sahibi Takımın İsmi:", finalIkiBinOnDort[0]['Home Team Name']);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log("Görev-1-b: 2014 Dünya Kupası Finali Deplasman Takımının İsmi:", finalIkiBinOnDort[0]['Away Team Name']);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log("Görev-1-c: 2014 Dünya Kupası Finali Ev Sahibi Takımın Golleri:", finalIkiBinOnDort[0]['Home Team Goals']);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log("Görev-1-d: 2014 Dünya Kupası Finali Deplasman Takımının Golleri:", finalIkiBinOnDort[0]['Away Team Goals']);
//(e) 2014 Dünya kupası finali kazananı*/
const kimKazandiFinali = () => {
	if (finalIkiBinOnDort[0]['Home Team Goals'] > finalIkiBinOnDort[0]['Away Team Goals']){
		return finalIkiBinOnDort[0]['Home Team Name']		 
	} else { return finalIkiBinOnDort[0]['Away Team Name']
	}
} 
console.log("Görev-1-e: 2014 Dünya Kupası Finali Kazananı:", kimKazandiFinali(), "Takımı");


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(diziAdi) {
	const finalDizi = diziAdi.filter(bul => bul.Stage == "Final");
	return finalDizi
}
Finaller(fifaData);
console.log("Görev-2: çıkan array'in uzunluğu:", Finaller(fifaData).length, "Doğru....");

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(dizin) {
	let finalMacDizisi = Finaller(dizin);
	let yillarDizisi = finalMacDizisi.map(mac => mac.Year);
	return yillarDizisi;
}
Yillar(fifaData);
console.log("Görev-3: Sadece Final Maçlarının, Yılları:", Yillar(fifaData));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(dizinAdi) {
	let kazanmislar = Finaller(dizinAdi);
	let kazananlarListesi = kazanmislar.map(mac => {
		if (mac['Home Team Goals'] > mac['Away Team Goals']) {
			return mac['Home Team Name'];
			} else {
			return mac['Away Team Name']
		};
	});
	return kazananlarListesi
};
Kazananlar(fifaData);
console.log("Görev-4: Final Maçlarının Kazananları:", Kazananlar(fifaData));


/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(datafifa, fFinaller, fYillar, fKazananlar) {
	let yilyil = fYillar(datafifa, fFinaller(datafifa));
	let ulkeulke = fKazananlar(datafifa, fFinaller(datafifa));
	let siraliTamListe = [];
		for (let i = 0; i < yilyil.length; i++) {
			siraliTamListe.push(`${yilyil[i]} yılında, ${ulkeulke[i]} dünya kupasını kazandı!`);
		} return siraliTamListe
} 

YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar);
console.log("Görev-5: Yıllara Göre Kazananlar:", YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(funcB) {
	const goal = funcB;
	const goalSum = goal.reduce((total,teams) => {return total + teams["Away Team Goals"] + teams["Home Team Goals"]},0);
	const match = funcB.length;
	const goalAverage = goalSum/match;
 	let ave = goalAverage.toFixed(2);
 	return ave;
}	
OrtalamaGolSayisi(Finaller(fifaData));
console.log("Görev-6: ", OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
