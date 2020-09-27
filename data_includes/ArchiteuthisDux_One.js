
// Do show progress bar (fine!!)
var showProgressBar = true;

// Main shuffleSequence definition
var shuffleSequence = seq(
    'consent',
    'setcounter',
    'intro',
    'shared-intro',
    sepWith("timeoutSep", rshuffle(startsWith('ATTRAGREEROMANIAN'),startsWith('filler'))),
     'debrief');

// Using modified controller coded by Ethan Poole (Umass, 2017)
// Disallows use of mouse for responses.
var DS = 'EPDashedSentence';

//  Set the Prolific Academic Completion URL
var sendingResultsMessage = "Vă rugăm să aşteptaţi. Răspunsurile dumneavoastră se trimit serverului."; 
var completionMessage = "Mulţumim pentru participare!"; 
var completionErrorMessage = "Eroare în trimiterea răspunsurilor dumneavoastră către server"; 

// Controller settings.
var defaults = [
    "QuestionAlt", {
        randomOrder: ['a','b','c','d'],
        presentHorizontally: true
},
"EPDashedSentence", {
    mode: 'self-paced reading',
    display: 'in place'
}
];

// Add breaks every 24 items
function modifyRunningOrder(ro)
{
    for (var i = 0; i < ro.length; ++i)
    {
        if (i % 24 == 1
            && i > 23
            && i < 250)
        {
            ro[i].push(new DynamicElement(
                "Message",
                {html: "<p>Vă rugăm să luaţi o mică pauză. Apăsaţi orice tastă când sunteţi gata să începeţi din nou.</p>", transfer: "keypress"},
            true));
            ro[i].push(new DynamicElement(
                "Separator",
                {transfer: 4000, normalMessage: "Atenţie! Primul fragment de propoziţie din acest set va apărea pe ecran în curând."},
            true));
        }
    }
    return ro;
}

// Items array.
var items = [

["consent", "Form", {consentRequired: true, html: {include: "consent.html"}}],
 ["setcounter", "__SetCounter__", { }],
["intro", "Form", {consentRequired: true, html: {include: "intro.html"}}],
["debrief", "Form", {consentRequired: true, html: {include: "debrief.html"}}],

['shared-intro', "Form", {consentRequired: false, html: {include: "shared_intro1.html"}}],

['shared-intro', "Form", {consentRequired: false, html: {include: "shared_intro2.html"}}],

['shared-intro', "Form", {consentRequired: false, html: {include: "shared_intro3.html"}}],


['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Vă rugăm să citiți cu atenție."}, DS, {s: "Această propoziţie e menită să vă obişnuiască cu stilul de lectură."}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Vă rugăm să citiți cu atenție."}, DS, {s: "Această propoziţie este un pic mai complicată decȃt propoziţia pe care aţi citit-o mai înainte."}],

['shared-intro', Message, {consentRequired: false,
                   html: ["div",
                           ["p", "Cum vi s-a părut?"],
                           ["p", "Citiți cu atenție, avȃnd grijă să înțelegeți fiecare cuvȃnt. Hai să mai exersăm un pic."]
                         ]}],

['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Vă rugăm să citiți cu atenție."}, DS, {s: "La bal, prinţul a valsat frumos şi a zȃmbit prinţesei."},"QuestionAlt", {q: "Cine a zȃmbit?", as: ['Prinţul','Prinţesa','Regele','Regina']}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Vă rugăm să citiți cu atenție."}, DS, {s: "Iepurii au alergat mult aseară."}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Vă rugăm să citiți cu atenție."}, DS, {s: "Miruna a stat toată noaptea cu fiul ei."},"QuestionAlt", {q: "Cine a stat toată noaptea cu fiul ei?", as: ['Miruna','Marina', 'Maria','Mara']}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Vă rugăm să citiți cu atenție."}, DS, {s: "Barista a pregătit un latte fără niciun chef şi nici măcar nu a făcut vreun design."}],
['shared-intro', Message, {consentRequired: false,
                   html: ["div",
                           ["p", "Bun, gata cu exersatul! Apăsaţi orice tastă când sunteţi gata să începeţi."]
                        ]}],

['shared-intro',"Separator",{transfer: 4000, normalMessage: "Atenţie! Prima propoziţie din acest set va apărea pe ecran în curând."}],

["timeoutSep", Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Vă rugăm să citiți cu atenție."}],

//// Shared experimental items + fillers

[["ATTRAGREEROMANIAN-matchsg",1],DS, {s:"Cartea de lângă femeie mereu are un farmec aparte." },"QuestionAlt", {q: "Cine/ Ce are un farmec aparte?", as: ["Cartea","Femeia","Cărţile","Femeile"]}],
[["ATTRAGREEROMANIAN-matchpl",1],DS, {s:"Cartea de lângă femei mereu are un farmec aparte."},"QuestionAlt", {q: "Cine/ Ce are un farmec aparte?", as: ["Cartea","Femeia","Cărţile","Femeile"]}],
[["ATTRAGREEROMANIAN-mismatchpl",1],DS, {s:"Cartea de lângă femei mereu au un farmec aparte."}, "QuestionAlt", {q: "Cine/ Ce are un farmec aparte?", as: ["Cartea","Femeia","Cărţile","Femeile"]}],
[["ATTRAGREEROMANIAN-mismatchsg",1],DS, {s:"Cartea de lângă femeie mereu au un farmec aparte."},"QuestionAlt", {q: "Cine/ Ce are un farmec aparte?", as: ["Cartea","Femeia","Cărţile","Femeile"]}],
[["ATTRAGREEROMANIAN-matchsg",2],DS, {s:"Vioara de lângă cântăreaţă mereu are arcuş maro deschis."},"QuestionAlt", {q: "Cine/ce are arcuș maro deschis?", as: ["Vioara","Cântăreața","Viorile","Cântărețele"]}],
[["ATTRAGREEROMANIAN-matchpl",2],DS, {s:"Vioara de lângă cântăreţe mereu are arcuş maro deschis."}, "QuestionAlt", {q: "Cine/ce are arcuș maro deschis?", as: ["Vioara","Cântăreața","Viorile","Cântărețele"]}],
[["ATTRAGREEROMANIAN-mismatchpl",2],DS, {s:"Vioara de lângă cântăreţe mereu au arcuş maro deschis."}, "QuestionAlt", {q: "Cine/ce are arcuș maro deschis?", as: ["Vioara","Cântăreața","Viorile","Cântărețele"]}],
[["ATTRAGREEROMANIAN-mismatchsg",2],DS, {s:"Vioara de lângă cântăreaţă mereu au arcuş maro deschis."},"QuestionAlt", {q: "Cine/ce are arcuș maro deschis?", as: ["Vioara","Cântăreața","Viorile","Cântărețele"]}],
[["ATTRAGREEROMANIAN-matchsg",3],DS, {s:"Rochia de lângă croitoreasă uneori au dantelă roz delicată. "},"QuestionAlt", {q: "Cine/ce are dantelă roz delicată?", as: ["Rochia","Croitoreasa","Rochiile","Croitoresele"]}],
[["ATTRAGREEROMANIAN-matchpl",3],DS, {s:"Rochia de lângă croitorese uneori au dantelă roz delicată."},"QuestionAlt", {q: "Cine/ce are dantelă roz delicată?", as: ["Rochia","Croitoreasa","Rochiile","Croitoresele"]}],
[["ATTRAGREEROMANIAN-mismatchpl",3],DS, {s:"Rochia de lângă croitorese uneori au dantelă roz delicată."},"QuestionAlt", {q: "Cine/ce are dantelă roz delicată?", as: ["Rochia","Croitoreasa","Rochiile","Croitoresele"]}],
[["ATTRAGREEROMANIAN-mismatchsg",3],DS, {s:"Rochia de lângă croitoreasă uneori au dantelă roz delicată."},"QuestionAlt", {q: "Cine/ce are dantelă roz delicată?", as: ["Rochia","Croitoreasa","Rochiile","Croitoresele"]}],
[["ATTRAGREEROMANIAN-matchsg",4],DS, {s:"Dulceaţa de lângă gospodină uneori au zahăr brun fin."},"QuestionAlt", {q: "Cine/ce are zahăr brun fin?", as: ["Dulceața","Gospodina", "Dulcețurile","Gospodinele"]}],
[["ATTRAGREEROMANIAN-matchpl",4],DS, {s:"Dulceaţa de lângă gospodine uneori au zahăr brun fin."},"QuestionAlt", {q: "Cine/ce are zahăr brun fin?", as: ["Dulceața","Gospodina", "Dulcețurile","Gospodinele"]}],
[["ATTRAGREEROMANIAN-mismatchpl",4],DS, {s:"Dulceaţa de lângă gospodine uneori au zahăr brun fin."},"QuestionAlt", {q: "Cine/ce are zahăr brun fin?", as: ["Dulceața","Gospodina", "Dulcețurile","Gospodinele"]}],
[["ATTRAGREEROMANIAN-mismatchsg",4],DS, {s:"Dulceaţa de lângă gospodină uneori au zahăr brun fin."},"QuestionAlt", {q: "Cine/ce are zahăr brun fin?", as: ["Dulceața","Gospodina", "Dulcețurile","Gospodinele"]}],


[["ATTRAGREEROMANIAN-matchsg",5],DS, {s:"Pisica de lângă fată adesea are mişcări unduitoare elegante."},"QuestionAlt", {q: "Cine are mişcări unduitoare elegante?", as: ["Pisica","Fata","Pisicile","Fetele"]}],
[["ATTRAGREEROMANIAN-matchpl",5],DS, {s:"Pisica de lângă fete adesea are mişcări unduitoare elegante."},"QuestionAlt", {q: "Cine are mişcări unduitoare elegante?", as: ["Pisica","Fata","Pisicile","Fetele"]}],
[["ATTRAGREEROMANIAN-mismatchpl",5],DS, {s:"Pisica de lângă fete adesea au mişcări unduitoare elegante."},"QuestionAlt", {q: "Cine are mişcări unduitoare elegante?", as: ["Pisica","Fata","Pisicile","Fetele"]}],
[["ATTRAGREEROMANIAN-mismatchsg",5],DS, {s:"Pisica de lângă fată adesea au mişcări unduitoare elegante."},"QuestionAlt", {q: "Cine are mişcări unduitoare elegante?", as: ["Pisica","Fata","Pisicile","Fetele"]}],
[["ATTRAGREEROMANIAN-matchsg",6],DS, {s:"Învăţătoarea de lângă elevă adesea are succes răsunător la ore."},"QuestionAlt", {q: "Cine are succes răsunător la ore?", as: ["Învățătoarea","Eleva", "Învățătoarele","Elevele"]}],
[["ATTRAGREEROMANIAN-matchpl",6],DS, {s:"Învăţătoarea de lângă eleve adesea are succes răsunător la ore."},"QuestionAlt", {q: "Cine are succes răsunător la ore?", as: ["Învățătoarea","Eleva", "Învățătoarele","Elevele"]}],
[["ATTRAGREEROMANIAN-mismatchpl",6],DS, {s:"Învăţătoarea de lângă eleve adesea au succes răsunător la ore."},"QuestionAlt", {q: "Cine are succes răsunător la ore?", as: ["Învățătoarea","Eleva", "Învățătoarele","Elevele"]}],
[["ATTRAGREEROMANIAN-mismatchsg",6],DS, {s:"Învăţătoarea de lângă elevă adesea au succes răsunător la ore."},"QuestionAlt", {q: "Cine are succes răsunător la ore?", as: ["Învățătoarea","Eleva", "Învățătoarele","Elevele"]}],
[["ATTRAGREEROMANIAN-matchsg",7],DS, {s:"Vânzătoarea de lângă contabilă mereu are mulţi bani de hârtie."},"QuestionAlt", {q: "Cine are mulţi bani de hârtie?", as: ["Vânzătoarea","Contabila","Vânzătoarele","Contabilele"]}],
[["ATTRAGREEROMANIAN-matchpl",7],DS, {s:"Vânzătoarea de lângă contabile mereu are mulţi bani de hârtie."},"QuestionAlt", {q: "Cine are mulţi bani de hârtie?", as: ["Vânzătoarea","Contabila","Vânzătoarele","Contabilele"]}],
[["ATTRAGREEROMANIAN-mismatchpl",7],DS, {s:"Vânzătoarea de lângă contabile mereu au mulţi bani de hârtie."},"QuestionAlt", {q: "Cine are mulţi bani de hârtie?", as: ["Vânzătoarea","Contabila","Vânzătoarele","Contabilele"]}],
[["ATTRAGREEROMANIAN-mismatchsg",7],DS, {s:"Vânzătoarea de lângă contabilă mereu au mulţi bani de hârtie."},"QuestionAlt", {q: "Cine are mulţi bani de hârtie?", as: ["Vânzătoarea","Contabila","Vânzătoarele","Contabilele"]}],
[["ATTRAGREEROMANIAN-matchsg",8],DS, {s:"Oaia de lângă ţărancă adesea are lapte foarte bun."},"QuestionAlt", {q: "Cine are lapte foarte bun?", as: ["Oaia","Ţăranca","Oile","Ţărăncile"]}],
[["ATTRAGREEROMANIAN-matchpl",8],DS, {s:"Oaia de lângă ţărănci adesea are lapte foarte bun."},"QuestionAlt", {q: "Cine are lapte foarte bun?", as: ["Oaia","Ţăranca","Oile","Ţărăncile"]}],
[["ATTRAGREEROMANIAN-mismatchpl",8],DS, {s:"Oile de lângă ţărănci adesea au lapte foarte bun."},"QuestionAlt", {q: "Cine are lapte foarte bun?", as: ["Oaia","Ţăranca","Oile","Ţărăncile"]}],
[["ATTRAGREEROMANIAN-mismatchsg",8],DS, {s:"Oile de lângă ţărancă adesea au lapte foarte bun."},"QuestionAlt", {q: "Cine are lapte foarte bun?", as: ["Oaia","Ţăranca","Oile","Ţărăncile"]}],


[["ATTRAGREEROMANIAN-matchsg",9],DS, {s:"Cuţitul de lângă organism uneori are viruşi letali numeroşi."},"QuestionAlt", {q: "Cine/ce are viruşi letali numeroşi?", as: ["Cuţitul","Organismul","Cuţitele","Organismele"]}],
[["ATTRAGREEROMANIAN-matchpl",9],DS, {s:"Cuţitul de lângă organisme uneori are viruşi letali numeroşi."},"QuestionAlt", {q: "Cine/ce are viruşi letali numeroşi?", as: ["Cuţitul","Organismul","Cuţitele","Organismele"]}], 
[["ATTRAGREEROMANIAN-mismatchpl",9],DS, {s:"Cuţitul de lângă organisme uneori au viruşi letali numeroşi."},"QuestionAlt", {q: "Cine/ce are viruşi letali numeroşi?", as: ["Cuţitul","Organismul","Cuţitele","Organismele"]}],
[["ATTRAGREEROMANIAN-mismatchsg",9],DS, {s:"Cuţitul de lângă organism uneori au viruşi letali numeroşi."},"QuestionAlt", {q: "Cine/ce are viruşi letali numeroşi?", as: ["Cuţitul","Organismul","Cuţitele","Organismele"]}],
[["ATTRAGREEROMANIAN-matchsg",10],DS, {s:"Tabloul de lângă animal uneori are vizitatori preşcolari curioşi."},"QuestionAlt", {q: "Cine/ce are vizitatori preşcolari curioşi? ", as: ["Tabloul","Animalul","Tablourile","Animalele"]}],   
[["ATTRAGREEROMANIAN-matchpl",10],DS, {s:"Tabloul de lângă animale uneori are vizitatori preşcolari curioşi."},"QuestionAlt", {q: "Cine/ce are vizitatori preşcolari curioşi?", as: ["Tabloul","Animalul","Tablourile","Animalele"]}], 
[["ATTRAGREEROMANIAN-mismatchpl",10],DS, {s:"Tabloul de lângă animale uneori au vizitatori preşcolari curioşi."},"QuestionAlt", {q: "Cine/ce are vizitatori preşcolari curioşi?", as: ["Tabloul","Animalul","Tablourile","Animalele"]}],  
[["ATTRAGREEROMANIAN-mismatchsg",10],DS, {s:"Tabloul de lângă animal uneori au vizitatori preşcolari curioşi."},"QuestionAlt", {q: "Cine/ce are vizitatori preşcolari curioşi?", as: ["Tabloul","Animalul","Tablourile","Animalele"]}], 
[["ATTRAGREEROMANIAN-matchsg",11],DS, {s:"Nisipul de lângă crustaceu adesea are calciu organic granular."},"QuestionAlt", {q: "Cine/ce are calciu organic granular?", as: ["Nisipul","Crustaceul","Nisipurile","Crustaceele"]}], 
[["ATTRAGREEROMANIAN-matchpl",11],DS, {s:"Nisipul de lângă crustacee adesea are calciu organic granular."},"QuestionAlt", {q: "Cine/ce are calciu organic granular?", as: ["Nisipul","Crustaceul","Nisipurile","Crustaceele"]}], 
[["ATTRAGREEROMANIAN-mismatchpl",11],DS, {s:"Nisipul de lângă crustacee adesea au calciu organic granular."},"QuestionAlt", {q: "Cine/ce are calciu organic granular?", as: ["Nisipul","Crustaceul","Nisipurile","Crustaceele"]}], 
[["ATTRAGREEROMANIAN-mismatchsg",11],DS, {s:"Nisipul de lângă crustaceu adesea au calciu organic granular."},"QuestionAlt", {q: "Cine/ce are calciu organic granular?", as: ["Nisipul","Crustaceul","Nisipurile","Crustaceele"]}],  
[["ATTRAGREEROMANIAN-matchsg",12],DS, {s:"Piureul de lângă macrou mereu are piper roşu măcinat."}, "QuestionAlt", {q: "Cine/ce are piper roşu măcinat?", as: ["Piureul","Macroul","Piureurile","Macrourile"]}], 
[["ATTRAGREEROMANIAN-matchpl",12],DS, {s:"Piureul de lângă macrouri mereu are piper roşu măcinat."},"QuestionAlt", {q: "Cine/ce are piper roşu măcinat?", as: ["Piureul","Macroul","Piureurile","Macrourile"]}], 
[["ATTRAGREEROMANIAN-mismatchpl",12],DS, {s:"Piureul de lângă macrouri mereu au piper roşu măcinat."},"QuestionAlt", {q: "Cine/ce are piper roşu măcinat?", as: ["Piureul","Macroul","Piureurile","Macrourile"]}],  
[["ATTRAGREEROMANIAN-mismatchsg",12],DS, {s:"Piureul de lângă macrou mereu au piper roşu măcinat."},"QuestionAlt", {q: "Cine/ce are piper roşu măcinat?", as: ["Piureul","Macroul","Piureurile","Macrourile"]}], 


[["ATTRAGREEROMANIAN-matchsg",13],DS, {s:"Sufletul de lângă trup mereu are aripi de înger diafane."},"QuestionAlt", {q: "Cine/ce are aripi de înger diafane?", as: ["Sufletul","Trupul","Sufletele","Trupurile"]}],     
[["ATTRAGREEROMANIAN-matchpl",13],DS, {s:"Sufletul de lângă trupuri mereu are aripi de înger diafane."},"QuestionAlt", {q: "Cine/ce are aripi de înger diafane?", as: ["Sufletul","Trupul","Sufletele","Trupurile"]}],   
[["ATTRAGREEROMANIAN-mismatchpl",13],DS, {s:"Sufletul de lângă trupuri mereu au aripi de înger diafane."}, "QuestionAlt", {q: "Cine/ce are aripi de înger diafane?", as: ["Sufletul","Trupul","Sufletele","Trupurile"]}],        
[["ATTRAGREEROMANIAN-mismatchsg",13],DS, {s:"Sufletul de lângă trup mereu au aripi de înger diafane."}, "QuestionAlt", {q: "Cine/ce are aripi de înger diafane?", as: ["Sufletul","Trupul","Sufletele","Trupurile"]}],  
[["ATTRAGREEROMANIAN-matchsg",14],DS, {s:"Mamiferul de lângă nevertebrat uneori are banane verzi necoapte."}, "QuestionAlt", {q: "Cine/ce are banane verzi necoapte?", as: ["Mamiferul","Nevertebratul","Mamiferele","Nevertebratele"]}],   
[["ATTRAGREEROMANIAN-matchpl",14],DS, {s:"Mamiferul de lângă nevertebrate uneori are banane verzi necoapte."},"QuestionAlt", {q: "Cine/ce are banane verzi necoapte?", as: ["Mamiferul","Nevertebratul","Mamiferele","Nevertebratele"]}],       
[["ATTRAGREEROMANIAN-mismatchpl",14],DS, {s:"Mamiferul de lângă nevertebrate uneori au banane verzi necoapte."},"QuestionAlt", {q: "Cine/ce are banane verzi necoapte?", as: ["Mamiferul","Nevertebratul","Mamiferele","Nevertebratele"]}],     
[["ATTRAGREEROMANIAN-mismatchsg",14],DS, {s:"Mamiferul de lângă nevertebrat uneori au banane verzi necoapte."}, "QuestionAlt", {q: "Cine/ce are banane verzi necoapte?", as: ["Mamiferul","Nevertebratul","Mamiferele","Nevertebratele"]}],     
[["ATTRAGREEROMANIAN-matchsg",15],DS, {s:"Macroul de lângă vertebrat adesea are icre rozalii pufoase."},"QuestionAlt", {q: "Cine/ce are icre rozalii pufoase?", as: ["Macroul","Vertebratul","Macrourile","Vertebratele"]}],    
[["ATTRAGREEROMANIAN-matchpl",15],DS, {s:"Macroul de lângă vertebrate adesea are icre rozalii pufoase."},"QuestionAlt", {q: "Cine/ce are icre rozalii pufoase?", as: ["Macroul","Vertebratul","Macrourile","Vertebratele"]}],   
[["ATTRAGREEROMANIAN-mismatchpl",15],DS, {s:"Macroul de lângă vertebrate adesea au icre rozalii pufoase."},"QuestionAlt", {q: "Cine/ce are icre rozalii pufoase?", as: ["Macroul","Vertebratul","Macrourile","Vertebratele"]}],    
[["ATTRAGREEROMANIAN-mismatchsg",15],DS, {s:"Macroul de lângă vertebrat adesea au icre rozalii pufoase."},"QuestionAlt", {q: "Cine/ce are icre rozalii pufoase?", as: ["Macroul","Vertebratul","Macrourile","Vertebratele"]}],     
[["ATTRAGREEROMANIAN-matchsg",16],DS, {s:"Animalul de lângă mamifer uneori are un entuziasm contagios."}, "QuestionAlt", {q: "Cine/ce are un entuziasm contagios?", as: ["Animalul","Mamiferul","Animalele","Mamiferele"]}],   
[["ATTRAGREEROMANIAN-matchpl",16],DS, {s:"Animalul de lângă mamifere uneori are un entuziasm contagios."}, "QuestionAlt", {q: "Cine/ce are un entuziasm contagios?", as: ["Animalul","Mamiferul","Animalele","Mamiferele"]}],    
[["ATTRAGREEROMANIAN-mismatchpl",16],DS, {s:"Animalul de lângă mamifere uneori au un entuziasm contagios."},"QuestionAlt", {q: "Cine/ce are un entuziasm contagios?", as: ["Animalul","Mamiferul","Animalele","Mamiferele"]}],     
[["ATTRAGREEROMANIAN-mismatchsg",16],DS, {s:"Animalul de lângă mamifer uneori au un entuziasm contagios."},"QuestionAlt", {q: "Cine/ce are un entuziasm contagios?", as: ["Animalul","Mamiferul","Animalele","Mamiferele"]}],    


[["ATTRAGREEROMANIAN-matchsg",17],DS, {s:"Câinele de lângă copil adesea are o energie debordantă."},"QuestionAlt", {q: "Cine/ce are o energie debordantă?", as:["Câinele","Copilul","Câinii","Copiii"]}],   
[["ATTRAGREEROMANIAN-matchpl",17],DS, {s:"Câinele de lângă copii adesea are o energie debordantă."},"QuestionAlt", {q: "Cine/ce are o energie debordantă?", as: ["Câinele","Copilul","Câinii","Copiii"]}],    
[["ATTRAGREEROMANIAN-mismatchpl",17],DS, {s:"Câinele de lângă copii adesea au o energie debordantă."},"QuestionAlt", {q: "Cine/ce are o energie debordantă?", as: ["Câinele","Copilul","Câinii","Copiii"]}],    
[["ATTRAGREEROMANIAN-mismatchsg",17],DS, {s:" Câinele de lângă copil adesea au o energie debordantă."},"QuestionAlt", {q: "Cine/ce are o energie debordantă?", as:["Câinele","Copilul","Câinii","Copiii"]}],   
[["ATTRAGREEROMANIAN-matchsg",18],DS, {s:"Doctorul de lângă pacient uneori are multă răbdare de fier."},"QuestionAlt", {q: "Cine/ce are multă răbdare de fier?", as: ["Doctorul","Pacientul","Doctorii","Pacienţii"]}],  
[["ATTRAGREEROMANIAN-matchpl",18],DS, {s:"Doctorul de lângă pacienţi uneori are multă răbdare de fier."},"QuestionAlt", {q: "Cine/ce are multă răbdare de fier?", as: ["Doctorul","Pacientul","Doctorii","Pacienţii"]}],   
[["ATTRAGREEROMANIAN-mismatchpl",18],DS, {s:"Doctorul de lângă pacienţi uneori au multă răbdare de fier."},"QuestionAlt", {q: "Cine/ce are multă răbdare de fier?", as: ["Doctorul","Pacientul","Doctorii","Pacienţii"]}],
[["ATTRAGREEROMANIAN-mismatchsg",18],DS, {s:"Doctorul de lângă pacient uneori au multă răbdare de fier."},"QuestionAlt", {q: "Cine/ce are multă răbdare de fier?", as: ["Doctorul","Pacientul","Doctorii","Pacienţii"]}],  
[["ATTRAGREEROMANIAN-matchsg",19],DS, {s:"Preotul de lângă călugăr mereu are multă înţelepciune bătrânească."},"QuestionAlt", {q: "Cine/ce are multă înţelepciune bătrânească?", as: ["Preotul","Călugărul","Preoţii","Călugării"]}],
[["ATTRAGREEROMANIAN-matchpl",19],DS, {s:"Preotul de lângă călugări mereu are multă înţelepciune bătrânească."},"QuestionAlt", {q: "Cine/ce are multă înţelepciune bătrânească?", as: ["Preotul","Călugărul","Preoţii","Călugării"]}],
[["ATTRAGREEROMANIAN-mismatchpl",19],DS, {s:"Preotul de lângă călugări mereu au multă înţelepciune bătrânească."},"QuestionAlt", {q: "Cine/ce are multă înţelepciune bătrânească?", as: ["Preotul","Călugărul","Preoţii","Călugării"]}],
[["ATTRAGREEROMANIAN-mismatchsg",19],DS, {s:"Preotul de lângă călugăr mereu au multă înţelepciune bătrânească."},"QuestionAlt", {q: "Cine/ce are multă înţelepciune bătrânească?", as: ["Preotul","Călugărul","Preoţii","Călugării"]}],
[["ATTRAGREEROMANIAN-matchsg",20],DS, {s:"Profesorul de lângă student uneori are numeroase realizări mari."},"QuestionAlt", {q: "Cine/ce are numeroase realizări mari?", as: ["Profesorul","Studentul","Profesorii","Studenţii"]}],
[["ATTRAGREEROMANIAN-matchpl",20],DS, {s:"Profesorul de lângă studenţi uneori are numeroase realizări mari."},"QuestionAlt", {q: "Cine/ce are numeroase realizări mari?", as: ["Profesorul","Studentul","Profesorii","Studenţii"]}],
[["ATTRAGREEROMANIAN-mismatchpl",20],DS, {s:"Profesorul de lângă studenţi uneori au numeroase realizări mari."},"QuestionAlt", {q: "Cine/ce are numeroase realizări mari?", as: ["Profesorul","Studentul","Profesorii","Studenţii"]}],
[["ATTRAGREEROMANIAN-mismatchsg",20],DS, {s:"Profesorul de lângă student uneori au numeroase realizări mari."},"QuestionAlt", {q: "Cine/ce are numeroase realizări mari?", as: ["Profesorul","Studentul","Profesorii","Studenţii"]}],
[["ATTRAGREEROMANIAN-matchsg",21],DS, {s:"Cârnatul de lângă hangiu mereu are sare grunjoasă multă."},"QuestionAlt", {q: "Cine/ce are sare grunjoasă multă ?", as: ["Cârnatul","Hangiul", "Cârnaţii","Hangiii"]}],
[["ATTRAGREEROMANIAN-matchpl",21],DS, {s:"Cârnatul de lângă hangii mereu are sare grunjoasă multă."},"QuestionAlt", {q: "Cine/ce are sare grunjoasă multă?", as: ["Cârnatul","Hangiul", "Cârnaţii","Hangiii"]}],
[["ATTRAGREEROMANIAN-mismatchpl",21],DS, {s:"Cârnatul de lângă hangii mereu au sare grunjoasă multă."},"QuestionAlt", {q: "Cine/ce are sare grunjoasă multă?", as: ["Cârnatul","Hangiul", "Cârnaţii","Hangiii"]}],
[["ATTRAGREEROMANIAN-mismatchsg",21],DS, {s:"Cârnatul de lângă hangiu mereu au sare grunjoasă multă."},"QuestionAlt", {q: "Cine/ce are sare grunjoasă multă?", as: ["Cârnatul","Hangiul", "Cârnaţii","Hangiii"]}],
[["ATTRAGREEROMANIAN-matchsg",22],DS, {s:"Buşteanul de lângă erou mereu are rezistenţă de invidiat."},"QuestionAlt", {q: "Cine/ce are rezistenţă de invidiat?", as: ["Buşteanul","Eroul", "Buştenii", "Eroii"]}],
[["ATTRAGREEROMANIAN-matchpl",22],DS, {s:"Buşteanul de lângă eroi mereu are rezistenţă de invidiat."},"QuestionAlt", {q: "Cine/ce are rezistenţă de invidiat?", as: ["Buşteanul","Eroul", "Buştenii", "Eroii"]}], 
[["ATTRAGREEROMANIAN-mismatchpl",22],DS, {s:"Buşteanul de lângă eroi mereu au rezistenţă de invidiat."},"QuestionAlt", {q: "Cine/ce are rezistenţă de invidiat?", as: ["Buşteanul","Eroul", "Buştenii", "Eroii"]}],
[["ATTRAGREEROMANIAN-mismatchsg",22],DS, {s:"Buşteanul de lângă erou mereu au rezistenţă de invidiat."},"QuestionAlt", {q: "Cine/ce are rezistenţă de invidiat?", as: ["Buşteanul","Eroul", "Buştenii", "Eroii"]}],
[["ATTRAGREEROMANIAN-matchsg",23],DS, {s:"Nasturele de lângă croitor adesea are aţă albastră groasă."},"QuestionAlt", {q: "Cine/ce are aţă albastră groasă?", as: ["Nasturele","Croitorul","Nasturii","Croitorii"]}],
[["ATTRAGREEROMANIAN-matchpl",23],DS, {s:"Nasturele de lângă croitori adesea are aţă albastră groasă."},"QuestionAlt", {q: "Cine/ce are aţă albastră groasă?", as: ["Nasturele","Croitorul","Nasturii","Croitorii"]}],
[["ATTRAGREEROMANIAN-mismatchpl",23],DS, {s:"Nasturele de lângă croitori adesea au aţă albastră groasă."},"QuestionAlt", {q: "Cine/ce are aţă albastră groasă?", as: ["Nasturele","Croitorul","Nasturii","Croitorii"]}],
[["ATTRAGREEROMANIAN-mismatchsg",23],DS, {s:"Nasturele de lângă croitor adesea au aţă albastră groasă."},"QuestionAlt", {q: "Cine/ce are aţă albastră groasă?", as: ["Nasturele","Croitorul","Nasturii","Croitorii"]}],
[["ATTRAGREEROMANIAN-matchsg",24],DS, {s:"Sacul de lângă contabil adesea are multe bancnote verzi."},"QuestionAlt", {q: "Cine/ce are multe bancnote verzi?", as: ["Sacul","Contabilul","Sacii","Contabilii"]}],
[["ATTRAGREEROMANIAN-matchpl",24],DS, {s:"Sacul de lângă contabili adesea are multe bancnote verzi."},"QuestionAlt", {q: "Cine/ce are multe bancnote verzi?", as: ["Sacul","Contabilul","Sacii","Contabilii"]}],
[["ATTRAGREEROMANIAN-mismatchpl",24],DS, {s:"Sacul de lângă contabili adesea au multe bancnote verzi."},"QuestionAlt", {q: "Cine/ce are multe bancnote verzi?", as: ["Sacul","Contabilul","Sacii","Contabilii"]}],
[["ATTRAGREEROMANIAN-mismatchsg",24],DS, {s:"Sacul de lângă contabil adesea au multe bancnote verzi."},"QuestionAlt", {q: "Cine/ce are multe bancnote verzi?", as: ["Sacul","Contabilul","Sacii","Contabilii"]}],


[["filler-twonounspluralcorrectchoice",25],DS, {s:"Fata pe care domnii o iubesc este frumoasă."}, "QuestionAlt", {q: "Cine iubeşte?", as: ["Fata","Domnul","Fetele", "Domnii" ]}],
[["filler-twonounspluralcorrectchoice",26],DS, {s:"Cartea pe care fetele o citesc este interesantă. "},"QuestionAlt", {q: "Cine citeşte?", as: ["Fata","Cartea", "Fetele","Cărţile"]}],
[["filler-twonounspluralcorrectchoice",27],DS, {s:"Pinguinul pe care copiii îl privesc este Apolodor."}],
[["filler-twonounspluralcorrectchoice",28],DS, {s:"Pisica pe care băieţii o lovesc este birmaneză. "}],
[["filler-twonounspluralcorrectchoice",29],DS, {s:"Veveriţa pe care bărbaţii o prind este maro. "}],
[["filler-twonounspluralcorrectchoice",30],DS, {s:"Lumina pe care oamenii o văd este verde. "}],
[["filler-twonounspluralcorrectchoice",31],DS, {s:"Casa pe care contabilii o construiesc este imensă. "}],
[["filler-twonounspluralcorrectchoice",32],DS, {s:"Mingea pe care sportivii o aleg este mare. "}],
[["filler-twonounspluralcorrectchoice",33],DS, {s:"Vinul pe care bucătarii îl beau este roşu."}],
[["filler-twonounspluralcorrectchoice",34],DS, {s:"Câinele pe care doctorii îl hrănesc este bolnav."}],
[["filler-twonounspluralcorrectchoice",35], DS, {s:"Poemul pe care tinerii îl spun este emoţionant."}],
[["filler-twonounspluralcorrectchoice",36],DS, {s:"Omul pe care animalele îl îndrăgesc este blând. "}]

,
 [["filler-twonounssingularcorrectchoice",37],DS, {s:"Vinurile pe care domnul le iubeşte sunt seci."}],
[["filler-twonounssingularcorrectchoice",38],DS, {s:"Scrisorile pe care fata le citeşte sunt lungi."}],
[["filler-twonounssingularcorrectchoice",39],DS, {s:"Girafele pe care copilul le priveşte sunt înalte."},"QuestionAlt", {q: "Cine priveşte?", as: ["Copilul","Girafa", "Copiii", "Girafele"]}],
[["filler-twonounssingularcorrectchoice",40],DS, {s:"Motanii pe care bunicul îi adăposteşte sunt tigraţi."},"QuestionAlt", {q: "Cine adăposteşte?", as: ["Bunicul","Motanul", "Bunicii", "Motanii"]}],
[["filler-twonounssingularcorrectchoice",41],DS, {s:"Şerpii pe care bărbatul îi striveşte sunt veninoşi."}],
[["filler-twonounssingularcorrectchoice",42],DS, {s:"Stelele pe care înţeleptul le urmăreşte sunt strălucitoare."}],
[["filler-twonounssingularcorrectchoice",43],DS, {s:"Barurile pe care pictorul le construieşte sunt artistice."}],
[["filler-twonounssingularcorrectchoice",44],DS, {s:"Păsările pe care colecţionarul le vede sunt impresionante."}],
[["filler-twonounssingularcorrectchoice",45],DS, {s:"Sucurile pe care chelnerul le bea sunt dulci."}],
[["filler-twonounssingularcorrectchoice",46],DS, {s:"Pisicile pe care doamna le îngrijeşte sunt slabe."}],
[["filler-twonounssingularcorrectchoice",47],DS, {s:"Cuvintele pe care preotul le rosteşte sunt înţelepte."}],
[["filler-twonounssingularcorrectchoice",48],DS, {s:"Câinii pe care pisica îi urăşte sunt răi."}]
,
 [["filler-coordination",49],DS, {s:"Femeia şi copilul beau mult suc."}],
[["filler-coordination",50],DS, {s:"Doctorul şi bolnavul plâng mult din cauza bolii."},"QuestionAlt", {q: "Cine plânge?", as: ["Doctorul","Bolnavul", "Doctorul şi bolnavul","Doctorul şi pacientul"]}],
[["filler-coordination",51],DS, {s:"Vulpoiul şi vulpea sar în aer foarte rapid."}],
[["filler-coordination",52],DS, {s:"Găina şi puiul ciugulesc firimituri adesea."},"QuestionAlt", {q: "Cine ciuguleşte?", as: ["Găina","Puiul","Găina şi puiul","Cocoşul şi puiul"]}],
[["filler-coordination",53],DS, {s:"Paharul şi sticla cad de pe birou uneori."}],
[["filler-coordination",54],DS, {s:"Oboseala şi plictisul ucid iubirea adesea."}],
[["filler-coordination",55],DS, {s:"Iubirea şi prietenia susţin moralul întotdeauna."}],
[["filler-coordination",56],DS, {s:"Căţelul şi pisica dorm după cină adesea."}],
 [["filler-coordination",57],DS, {s:"Cafeaua şi ceaiul au efecte laxative."}],
[["filler-coordination",58],DS, {s:"Trandafirul şi zambila miros foarte frumos."}],
[["filler-coordination",59],DS, {s:"Cartea şi caietul sunt pe masă mereu."}],
[["filler-coordination",60],DS, {s:"Papagalul şi băiatul vorbesc foarte mult unul cu altul."}]
,
[["filler-semanticchoice",61],DS, {s:"Lampa de lângă cartea verde se aprinde uşor."}],
[["filler-semanticchoice",62],DS, {s:"Fetiţa de lângă camera albastră dansează."}],
[["filler-semanticchoice",63],DS, {s:"Iepuraşul de lângă scaunul roşu doarme."}],
[["filler-semanticchoice",64],DS, {s:"Pasărea de lângă masa neagră cântă bine."}],
[["filler-semanticchoice",65],DS, {s:"Măgarul de lângă căţelul maro rage adesea. "},"QuestionAlt", {q: "Cine rage adesea?", as: ["Măgarul","Căţelul maro","Măgarii","Căţeii maro", ]}],
[["filler-semanticchoice",66],DS, {s:"Papucii de lângă copiii bolnavi alunecă uşor."}],
[["filler-semanticchoice",67],DS, {s:"Hainele de lângă femeile zâmbăreţe cad mereu."}],
[["filler-semanticchoice",68],DS, {s:"Albinele de lângă portocalele stricate bȃzȃie prea tare."}],
[["filler-semanticchoice",69],DS, {s:"Râul de lângă pădurea frumoasă curge adesea vara."}],
[["filler-semanticchoice",70],DS, {s:"Urşii de lângă prinţesele minunate hibernează."},"QuestionAlt", {q: "Cine hibernează?", as: ["Ursul", "Prinţesa minunate", "Urşii","Prinţesele minunate"]}],
[["filler-semanticchoice",71],DS, {s:"Florile de lângă sticlele albastre se ofilesc mereu."}],
[["filler-semanticchoice",72],DS, {s:"Calculatoarele de lângă copiii năzdrăvani se strică uneori."}],

[["filler-onenounplagreement",73], DS, {s:"Iepuraşii fricoşi se ascund de oameni adesea."}, "QuestionAlt", {q: "Cine se ascunde de oameni adesea?", as: ["Iepuraşul fricos","Leul fricos","Iepuraşii fricoşi","Leii fricoşi"]}],
[["filler-onenounplagreement",74], DS, {s:"Cutremurele mari distrug locuinţe tot timpul."}],
[["filler-onenounplagreement",75], DS, {s:"Grădinile japoneze au trandafiri adesea."}],
[["filler-onenounplagreement",76], DS, {s:"Fetele seducătoare atrag admiratori adesea."},"QuestionAlt", {q: "Cine atrage admiratori adesea?", as: ["Fata seducătoare ","Femeia seducătoare","Fetele seducătoare ","Femeile seducătoare"]}],
[["filler-onenounplagreement",77], DS, {s:"Muzicienii creativi compun melodii deosebite."}],
[["filler-onenounplagreement",78], DS, {s:"Rănile sufleteşti dor foarte tare."}],
[["filler-onenounplagreement",79], DS, {s:"Paharele colorate conţin suc de portocale."}],
[["filler-onenounplagreement",80], DS, {s:"Hamsterii curioşi apar în bucătărie adesea."}],
[["filler-onenounplagreement",81], DS, {s:"Elevii cuminţi doresc note mari."}],
[["filler-onenounplagreement",82], DS, {s:"Parfumurile franţuzeşti miros incredibil de frumos."}],
[["filler-onenounplagreement",83], DS, {s:"Bunicii iubitori dau multe cadouri nepoţilor lor."}],
[["filler-onenounplagreement",84], DS, {s:"Cheile verzi deschid multe uşi."}],

[["filler-onenounsgagreement",85],DS, {s:"Fata şatenă se ascunde de prieteni adesea."}],
[["filler-onenounsgagreement",86],DS, {s:"Pisica năzdrăvană sparge vase tot timpul."},"QuestionAlt", {q: "Cine sparge vase tot timpul?", as: ["Pisica năzdrăvană","Pisica simpatică", "Pisicile năzdrăvană","Pisicile simpatice"]}],
[["filler-onenounsgagreement",87],DS, {s:"Caietul negru are pagini albe."}],
[["filler-onenounsgagreement",88],DS, {s:"Magnetul maro atrage metale adesea."}],
[["filler-onenounsgagreement",89],DS, {s:"Pixul albastru scrie foarte bine."}],
[["filler-onenounsgagreement",90],DS, {s:"Iepurele alb sare cu mare agilitate."}],
[["filler-onenounsgagreement",91],DS, {s:"Studentul harnic munceşte foarte mult."}],
[["filler-onenounsgagreement",92],DS, {s:"Femeia misterioasă dispare în străinătate adesea."}],
[["filler-onenounsgagreement",93],DS, {s:"Poetul talentat vorbeşte foarte frumos."}],
[["filler-onenounsgagreement",94],DS, {s:"Mâncarea gustoasă miroase foarte bine."},"QuestionAlt", {q: "Ce miroase foarte bine?", as: ["Mâncarea gustoasă","Zambila roz", "Mâncarurile gustoase","Zambilele roz",]}],
[["filler-onenounsgagreement",95],DS, {s:"Cursul masteral cuprinde multe informaţii."}],
[["filler-onenounsgagreement",96],DS, {s:"Bagajul mare conţine haine de iarnă."}]
];
