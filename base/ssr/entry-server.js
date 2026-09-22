import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { cva } from "class-variance-authority";
import { cn, cn as cn$1 } from "cn";
import { Dialog, Label, Separator, Slot } from "radix-ui";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, ArrowUpRight, ChevronRightIcon, Mail, Menu, Phone, XIcon } from "lucide-react";
//#region src/components/ui/button.tsx
var buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			cta: "h-11 gap-2 rounded-lg px-5 text-[0.9375rem] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-4",
			icon: "size-8",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
	const Comp = asChild ? Slot.Root : "button";
	return /* @__PURE__ */ jsx(Comp, {
		"data-slot": "button",
		"data-variant": variant,
		"data-size": size,
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region src/components/icons.tsx
var icons = {
	"briefcase": {
		viewBox: "0 0 1024 1024",
		transform: "translate(0 960) scale(1 -1)",
		d: "M139 520L267 393Q299 361 325 340.5Q351 320 416 320L608 320Q668 320 695.5 338Q723 356 760 393L887 522Q907 542 885 564.5Q863 587 843 567L716 439Q687 409 662 396.5Q637 384 608 384L416 384Q376 384 353.5 401.5Q331 419 311 439L183 566Q161 588 138.5 565.5Q116 543 139 520ZM352 960Q313 960 284.5 931.5Q256 903 256 864L256 800Q256 768 288 768Q320 768 320 800L320 864Q320 878 329 887Q338 896 352 896L672 896Q686 896 695 887Q704 878 704 864L704 800Q704 768 736 768.5Q768 769 768 800L768 864Q768 903 739.5 931.5Q711 960 672 960ZM96 704Q57 704 28.5 675.5Q0 647 0 608L0 96Q0 57 28.5 28.5Q57 0 96 0L928 0Q967 0 995.5 28.5Q1024 57 1024 96L1024 608Q1024 647 995.5 675.5Q967 704 928 704ZM96 640L928 640Q942 640 951 631Q960 622 960 608L960 96Q960 82 951 73Q942 64 928 64L96 64Q82 64 73 73Q64 82 64 96L64 608Q64 622 73 631Q82 640 96 640Z"
	},
	"idea": {
		viewBox: "0 0 1024 1024",
		transform: "translate(0 960) scale(1 -1)",
		d: "M823 804L778 759Q755 736 778 713.5Q801 691 823 714L868 759Q891 781 868.5 804Q846 827 823 805ZM928 448L864 448Q832 448 832 416Q832 384 864 384L928 384Q959 384 959.5 416Q960 448 928 448ZM96 448L32 448Q0 448 0 416Q0 384 32 384L96 384Q127 384 127.5 416Q128 448 96 448ZM352 0L608 0Q640 0 640 -32Q640 -64 608 -64L352 -64Q321 -64 320.5 -32Q320 0 352 0ZM512 928L512 864Q512 832 480 832Q448 832 448 864L448 928Q448 959 480 959.5Q512 960 512 928ZM480 768Q419 768 366.5 740Q314 712 275 663.5Q236 615 214 551Q192 487 192 416Q192 345 214 281Q236 217 275 168.5Q314 120 366.5 92Q419 64 480 64Q541 64 593.5 92Q646 120 685 168.5Q724 217 746 281Q768 345 768 416Q768 487 746 551Q724 615 685 663.5Q646 712 593.5 740Q541 768 480 768ZM480 704Q525 704 565.5 682Q606 660 637 621Q668 582 686 529.5Q704 477 704 416Q704 329 668.5 261Q633 193 578 158Q579 209 581.5 248.5Q584 288 590 314Q597 344 606.5 362Q616 380 630 394Q654 418 629 438Q604 458 586 440Q566 420 551 392.5Q536 365 528 328Q520 292 516 244Q512 196 512 132Q498 128 480 128Q462 128 448 132Q448 196 444 244Q440 292 432 328Q424 364 409 392Q394 420 374 440Q355 459 331 438Q307 417 330 394Q344 380 353.5 362Q363 344 370 314Q376 288 378.5 248.5Q381 209 382 158Q327 193 291.5 261Q256 329 256 416Q256 477 274 529.5Q292 582 323 621Q354 660 394.5 682Q435 704 480 704ZM137 804L182 759Q205 736 182 713.5Q159 691 137 714L92 759Q69 781 91.5 804Q114 827 137 804Z"
	},
	"growing-chart": {
		viewBox: "0 0 1024 1024",
		transform: "translate(0 960) scale(1 -1)",
		d: "M864 512L960 512L960 416Q960 384 992 384Q1024 384 1024 416L1024 544Q1024 557 1014.5 566.5Q1005 576 992 576L864 576Q832 576 832 544Q832 512 864 512ZM458 439Q454 435 419 399.5Q384 364 335 314.5Q286 265 233 211.5Q180 158 140 119Q115 94 137 72.5Q159 51 184 76Q221 113 271.5 164Q322 215 368.5 261.5Q415 308 447.5 341Q480 374 480 374L650 200Q659 192 672 192Q685 192 694 200L887 397Q909 419 885 438.5Q861 458 843 440L672 265L502 439Q493 448 480 447.5Q467 447 458 439ZM0 928L0 -32Q0 -45 9.5 -54.5Q19 -64 32 -64L992 -64Q1024 -64 1024 -32Q1024 0 992 0L64 0L64 928Q64 960 32 959.5Q0 959 0 928Z"
	},
	"setting": {
		viewBox: "0 0 1024 1024",
		transform: "translate(0 960) scale(1 -1)",
		d: "M384 864L384 808Q375 805 366 801.5Q357 798 348 794L308 834Q278 864 240 862.5Q202 861 174 834L128 790Q100 763 100.5 721Q101 679 126 654L166 612Q162 603 158.5 594Q155 585 152 576L96 576Q57 576 28.5 548Q0 520 0 480L0 416Q0 377 28.5 348.5Q57 320 96 320L154 320Q157 312 159.5 304Q162 296 166 288L126 246Q105 224 101 182.5Q97 141 128 110L174 64Q202 36 241 36Q280 36 308 64Q318 74 328.5 84Q339 94 348 104Q357 100 366 96.5Q375 93 384 90L384 32Q384 -7 412 -35.5Q440 -64 480 -64L544 -64Q583 -64 611.5 -35.5Q640 -7 640 32L640 90Q649 93 658 96.5Q667 100 676 104Q683 95 694.5 84.5Q706 74 716 64Q744 36 783 36Q822 36 850 64L896 110Q923 138 923.5 179Q924 220 898 246Q884 260 871 274Q858 288 858 288Q862 296 864.5 304Q867 312 870 320L928 320Q967 320 995.5 348.5Q1024 377 1024 416L1024 480Q1024 520 995.5 548Q967 576 928 576L872 576Q869 585 865.5 594Q862 603 858 612L898 654Q923 680 923 721.5Q923 763 896 790L850 834Q817 865 778.5 861.5Q740 858 716 834L676 794Q667 798 658 801.5Q649 805 640 808L640 864Q640 903 611.5 931.5Q583 960 544 960L480 960Q440 960 412 932Q384 904 384 864ZM544 896Q558 896 567 887Q576 878 576 864L576 786Q576 776 583 767.5Q590 759 600 756Q619 751 636 744Q653 737 668 728Q677 723 688 725Q699 727 706 734L760 788Q771 799 784 798Q797 797 806 788L852 744Q864 732 861 720Q858 708 850 700L796 644Q789 636 788 625.5Q787 615 792 606Q801 590 808 572.5Q815 555 820 536Q823 526 831.5 519Q840 512 850 512L928 512Q942 512 951 503Q960 494 960 480L960 416Q960 402 951 393Q942 384 928 384L850 384Q840 384 831.5 377.5Q823 371 820 362Q815 343 808 326.5Q801 310 792 294Q787 285 788 274Q789 263 796 256L852 200Q862 190 862 178Q862 166 852 156L806 110Q797 101 784.5 101Q772 101 762 110L708 166Q700 174 688.5 175Q677 176 668 170Q652 161 635 154Q618 147 600 142Q590 139 583 130Q576 121 576 110L576 32Q576 18 567 9Q558 0 544 0L480 0Q466 0 457 9Q448 18 448 32L448 110Q448 121 441.5 130Q435 139 424 142Q406 147 389 154Q372 161 356 170Q347 176 335.5 174.5Q324 173 316 166L262 110Q252 101 240 100.5Q228 100 218 110L172 156Q162 166 162 178Q162 190 172 200L228 256Q235 264 236 274.5Q237 285 232 294Q223 310 216 327Q209 344 204 362Q201 371 192.5 377.5Q184 384 174 384L96 384Q82 384 73 393Q64 402 64 416L64 480Q64 494 73 503Q82 512 96 512L174 512Q184 512 192.5 519Q201 526 204 536Q209 555 216 572.5Q223 590 232 606Q237 615 236 625.5Q235 636 228 644L174 700Q162 712 163.5 724.5Q165 737 172 744L218 788Q229 799 242.5 797.5Q256 796 264 788L318 734Q325 727 336 725Q347 723 356 728Q371 736 388 743.5Q405 751 424 756Q434 758 441 767Q448 776 448 786L448 864Q448 878 457 887Q466 896 480 896ZM512 640Q433 640 376.5 583.5Q320 527 320 448Q320 369 376.5 312.5Q433 256 512 256Q591 256 647.5 312.5Q704 369 704 448Q704 527 647.5 583.5Q591 640 512 640ZM512 576Q565 576 602.5 538.5Q640 501 640 448Q640 395 602.5 357.5Q565 320 512 320Q459 320 421.5 357.5Q384 395 384 448Q384 501 421.5 538.5Q459 576 512 576Z"
	},
	"facebook": {
		viewBox: "0 0 512 512",
		transform: "translate(0 514) scale(1 -1)",
		d: "M296 0L202 0L202 234L123 234L123 325L202 325L202 392C202 470 249 512 319 512C352 512 381 510 389 508L389 427L341 427C303 427 296 409 296 383L296 325L386 325L374 234L296 234Z"
	},
	"linkedin": {
		viewBox: "0 0 512 512",
		transform: "translate(0 514) scale(1 -1)",
		d: "M383 250C389 241 392 228 392 211L392 14C392 11 394 8 396 5C399 3 402 1 405 1L499 1C502 1 506 3 508 5C511 8 512 11 512 14L512 232C512 274 500 305 476 327C452 348 419 358 376 358C339 358 308 348 285 326L285 334C285 335 284 338 284 341C283 344 282 347 280 348C278 349 275 350 272 350L183 350C180 350 177 348 174 346C172 343 170 340 170 337L170 14C170 11 172 8 174 5C177 3 180 1 183 1L275 1C278 1 282 3 284 5C287 8 288 11 288 14L288 189C288 212 292 230 301 243C310 255 325 262 347 262C364 262 376 258 383 250ZM106 405C118 417 124 431 124 449C124 466 118 480 106 492C94 504 79 511 62 511C45 511 30 504 18 492C6 480 0 466 0 449C0 431 6 417 18 405C30 393 45 387 62 387C79 387 94 393 106 405ZM121 337C121 340 119 343 117 346C114 348 111 350 108 350L16 350C13 350 10 348 7 346C5 343 3 340 3 337L3 14C3 11 5 8 7 5C10 3 13 1 16 1L108 1C111 1 114 3 117 5C119 8 121 11 121 14Z"
	},
	"twitter": {
		viewBox: "0 0 512 512",
		transform: "translate(0 514) scale(1 -1)",
		d: "M460 360C480 375 498 394 512 415C493 406 473 401 452 398C473 411 490 432 498 456C478 444 455 436 431 431C412 451 385 464 354 464C296 464 249 417 249 359C249 351 250 343 252 335C165 339 87 381 36 445C27 429 21 411 21 392C21 356 40 323 68 305C51 305 35 310 21 318L21 316C21 266 57 223 105 213C96 211 87 210 77 210C70 210 64 210 57 212C71 170 110 139 156 139C120 110 74 94 25 94C17 94 8 94 0 95C46 65 102 48 161 48C354 48 460 208 460 347Z"
	}
};
var iconNames = Object.keys(icons);
function Icon({ name, className }) {
	const spec = icons[name];
	return /* @__PURE__ */ jsx("svg", {
		className,
		viewBox: spec.viewBox,
		"aria-hidden": "true",
		focusable: "false",
		role: "presentation",
		children: /* @__PURE__ */ jsx("g", {
			transform: spec.transform,
			children: /* @__PURE__ */ jsx("path", {
				d: spec.d,
				fill: "currentColor"
			})
		})
	});
}
var pages_default = {
	source: "https://www.luciancs.nl",
	sourceUpdated: "2026-09-18T15:16:43",
	pages: [
		{
			"id": 7,
			"path": "/over.html",
			"title": "Over - LUCIAN",
			"description": "Wanneer je zaken doet met LUCIAN, doe je zaken met Andries Luchies! Een nuchtere, eerlijke, ambitieuze noorderling geboren in 1975, met 3 kinderen, een",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Over mij"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wanneer je zaken doet met LUCIAN, doe je zaken met Andries Luchies! Een nuchtere, eerlijke, ambitieuze noorderling geboren in 1975, met 3 kinderen, een geweldig lieve vrouw en een tomeloze passie voor alles wat met financiën te maken heeft."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Was die passie voor financiën er nou altijd al?, nou bepaald niet! Pas op 28-jarige leeftijd, na talloze omzwervingen zonder enig uitzicht op een carrière, besloot ik het over een andere boeg te gooien. Die andere boeg werd een studie HEAO Bedrijfseconomie, daar waar economische wetenschappen op het voortgezet onderwijs nou niet bepaald een vak was waar ik in uitblonk."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Waarom niet starten met een studie waar je op het eerste gezicht nauwelijks affiniteit mee hebt, gewoon durven en het bleek onverwachts een schot in de roos! Alles wat ik aan opleidingen en cursussen oppakte op financieel-administratief gebied ging me met zo'n speels gemak af dat ik me soms wel eens afvroeg waarom ik op school zo bedroevend slecht was in economische wetenschappen. Sommige dingen moet je waarschijnlijk gewoon ingroeien en daar hoorde dit klaarblijkelijk ook bij!"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "En dan studeer je af in 2008 en bestorm je de arbeidsmarkt met een hoop ambitie en positiviteit ; en dan blijkt die arbeidsmarkt op dat moment niet toe te zijn aan een 33-jarige afgestudeerde bedrijfseconoom ! Op dat moment is dat natuurlijk een vreselijke domper maar laat je je zeker niet uit het veld slaan. Nee, dan begin je -naast je deeltijdbaan in de beveiliging- voor jezelf zo blanco, zonder netwerk in een sector waar je nog geen enkele footprint achtergelaten hebt! Juist dat heb ik gedaan en in 2009 landde ik mijn eerste klant (DIEETOOK uit Winschoten) waar ik tot op heden nog steeds, met veel plezier, voor aan het werk ben. Daarna kondigden zich met enige regelmaat nieuwe klanten aan en stapten er met enige regelmaat natuurlijk ook weer klanten op."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Geleidelijk groeide LUCIAN en nam het aantal uren besteed aan zelfstandig ondernemerschap toe met een gelijktijdige afname van het aantal uren in loondienst, want je leeft immers niet om te werken, maar werkt om te leven!"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "En nu? Nu probeer ik door te groeien naar volledige zelfstandigheid. Om dit voor elkaar te krijgen investeer ik zeker de helft van mijn omzet in marketing en andere manieren om mezelf beter in de markt te zetten. Daarnaast blijft studeren een hobby van mij en ben ik doorlopend bezig met het actueel houden en upgraden van mijn kennis. Het mag duidelijk zijn dat het niet ontbreekt aan ambitie en dat er als het aan mij ligt een veelbelovende toekomst weggelegd is voor LUCIAN als speler in de financiële sector."
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 8,
			"path": "/administratiekantoor.html",
			"title": "Administratiekantoor Winschoten | LUCIAN",
			"description": "Op zoek naar een betrouwbare partner voor je boekhouding? LUCIAN is hét administratiekantoor voor Winschoten e.o. Neem vrijblijvend contact op!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Administratiekantoor"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Uw partner voor een gezonde financiële balans"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bent u op zoek naar een administratiekantoor in Winschoten e.o. dat spreekt in begrijpelijke taal?; ik geloof in een nuchtere, duidelijke aanpak. Of u nu een ondernemer bent die grip wil op de zaak, of een particulier die rust zoekt in de privéfinanciën: ik ben er om u volledig te ontzorgen. Mijn dienstverlening is transparant, deskundig en altijd gericht op uw specifieke situatie."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met LUCIAN haalt u een betaalbare professional in huis die uw behoeften inventariseert en van A tot Z verzorgt."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Zakelijk in balans: grip op uw onderneming"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als ondernemer wilt u zich bezighouden met uw core business en groei, niet met de dagelijkse administratieve beslommeringen. Van het verzorgen van uw volledige financiële administratie tot het verstrekken van strategisch bedrijfseconomisch advies; LUCIAN is uw externe partner met interne betrokkenheid."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik help u bij het opzetten en beheersen van uw administratieve organisatie, kostprijscalculaties en kritische investeringsselecties."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Financiële administratie"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Een gezonde onderneming begint bij een strak georganiseerde boekhouding. Veel ondernemers verliezen kostbare tijd met het bijwerken van cijfers. LUCIAN zorgt er met slimme oplossingen voor dat u op elk gewenst moment inzicht heeft in de actuele financiële stand van zaken. Door mijn transparante werkwijze weet u precies hoe u er voor staat, wat u helpt bij het maken van de juiste beslissingen voor de toekomst."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/administratiekantoor/financiele-administratie.html",
							"c": [{
								"t": "text",
								"v": "Hoe uw administratie te stroomlijnen en tijd te besparen >>>"
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Administratieve organisatie & Interne beheersing"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Hoe efficiënt zijn uw bedrijfsprocessen nou eigenlijk echt? Van inventarisatie en structurering van uw informatiebehoefte tot controle op de uitvoering; in LUCIAN vindt u een vakkundige sparringpartner. Ik kijk met een nuchtere blik naar uw organisatie en help u uw processen te optimaliseren, zodat u de controle weer krijgt en houdt."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/administratiekantoor/ao-ib.html",
							"c": [{
								"t": "text",
								"v": "Hoe een waterdichte AO&IB blinde vlekken in uw organisatie voorkomt >>>"
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Bedrijfseconomisch advies"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Behoefte aan fris, onpartijdig advies?, ik bied onafhankelijk en objectief bedrijfseconomisch advies op strategisch, tactisch en operationeel niveau. Of het nu gaat om groeiplannen, herstructurering of besparingen: samen met LUCIAN realiseert u uw zakelijke doelen op een duurzame wijze."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/administratiekantoor/bedrijfseconomisch-advies.html",
							"c": [{
								"t": "text",
								"v": "Hoe bedrijfseconomisch advies verborgen kansen in uw cijfers blootlegt >>>"
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Quickscan"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Heeft u het gevoel dat er binnen uw organisatie zaken verbeterd kunnen worden, maar krijgt u de vinger niet precies op de zere plek?, mijn Quickscan biedt uitkomst. Ik analyseer uw huidige processen en leg pijnpunten bloot, om vervolgens met praktische, direct toepasbare oplossingen te komen."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/administratiekantoor/quickscan.html",
							"c": [{
								"t": "text",
								"v": "Hoe mijn Quickscan de vinger op de zere plek legt >>>"
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Privé in balans: rust en perspectief in uw financiën"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Niet alleen zakelijk, maar ook privé is financiële rust essentieel. Want hoe kunt u nou serieus werken aan een gezonde financiële toekomst wanneer het zicht op het hier en nu ontbreekt? Voor particulieren uit Winschoten e.o. bied ik een persoonlijke, directe vorm van dienstverlening die gericht is op overzicht en stabiliteit."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Zicht op uw financiën begint met het organiseren van uw administratie. Voor veel mensen voelt dit als Don Quichot vechtend tegen windmolens. Ik help u om letterlijk en figuurlijk orde te scheppen in de chaos. Zodra uw administratie (weer) een georganiseerd geheel is, is de basis gelegd voor de volgende stap: een grondige analyse van uw huidige situatie."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "De financiële analyse: waar staat u nu?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Mijn analyse geeft helder en eerlijk antwoord op de vragen die er echt toe doen:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Inkomsten & uitgaven"
								}]
							}, {
								"t": "text",
								"v": ": wat komt er maandelijks binnen en wat gaat eruit? Hoe is de verhouding tussen vaste en variabele lasten?"
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Vermogen"
								}]
							}, {
								"t": "text",
								"v": ": wat bezit u precies en hoe is dit vermogen opgebouwd?"
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Schulden"
								}]
							}, {
								"t": "text",
								"v": ": Is er sprake van schulden, hoe hoog zijn deze en aan wie bent u geld verschuldigd?"
							}]
						]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "In deze fase beoordeel ik of uw uitgaven gedekt worden door uw inkomsten en bepaal ik uw werkelijke financiële draagkracht. Dit gebeurt altijd op een transparante manier, zonder oordeel en met volledige vertrouwelijkheid."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Vooruit kijken en doelen realiseren"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Nadat de huidige status in kaart is gebracht, verschuift de focus naar de toekomst. U kunt pas iets tastbaars realiseren wanneer u duidelijke doelstellingen formuleert. Waar wilt u naartoe met uw privéfinanciën? Wat wilt u bereiken? Samen kijken we of deze doelen met de beschikbare middelen haalbaar zijn. Indien nodig adviseer ik over maatregelen om uw koers bij te sturen, zodat uw dromen ook financieel haalbaar worden."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Begeleiding en controle: de spreekwoordelijke stok achter de deur"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het is menselijk om afspraken te 'vergeten', zelfs de afspraken die u met uzelf heeft gemaakt. LUCIAN fungeert hierbij als uw mentor. Ik controleer u regelmatig op uw vorderingen en kijk of alles (nog) naar wens verloopt. Waar nodig stuur ik bij, zodat u op koers blijft richting die gezonde financiële toekomst."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom kiezen voor LUCIAN?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wanneer u kiest voor LUCIAN, kiest u voor een nuchtere, no-nonsense aanpak. Ik spreek de taal van de ondernemer en de taal van de burger. Mijn missie is simpel: u ontzorgen door ingewikkelde zaken begrijpelijk te maken. Mijn dienstverlening is flexibel en volledig afgestemd op wat u nodig heeft om zowel zakelijk als privé in balans te blijven."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bedankt voor uw interesse en de tijd die u heeft genomen om mijn aanbod door te lezen. Heeft u na het lezen van deze informatie nog vragen of wilt u direct kennismaken?, dan nodig ik u van harte uit om contact met mij op te nemen."
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Met vriendelijke groet,"
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Andries"
								}]
							}
						]
					}
				]
			}]
		},
		{
			"id": 42,
			"path": "/",
			"title": "LUCIAN: ontzorger voor ondernemer en particulier",
			"description": "LUCIAN is de allround ontzorger bij financiële administratie, belastingadvies en creditmanagement. Voor ondernemer en particulier: krijg grip op je cijfers!",
			"sections": [
				{
					"t": "banner",
					"heading": "Ontzorger voor ondernemer en particulier"
				},
				{
					"t": "services",
					"cards": [
						{
							"title": "Administratiekantoor",
							"lead": [
								{
									"t": "text",
									"v": "ontzorger op administratief gebied"
								},
								{ "t": "br" },
								{
									"t": "text",
									"v": "hier kunt u terecht met vrijwel al uw hulpvragen."
								}
							],
							"href": "/administratiekantoor.html",
							"icon": "briefcase",
							"items": [
								"Financiële administratie",
								"Bedrijfseconomisch advies",
								"AO/IB",
								"Quickscan"
							]
						},
						{
							"title": "Belastingadviseur",
							"lead": [
								{
									"t": "text",
									"v": "ontzorger op het gebied van belastingen"
								},
								{ "t": "br" },
								{
									"t": "text",
									"v": "hier kunt u terecht met vrijwel al uw hulpvragen."
								}
							],
							"href": "/belastingadviseur.html",
							"icon": "idea",
							"items": [
								"Inkomstenbelasting",
								"Vennootschapsbelasting",
								"Omzetbelasting",
								"Erf-en schenkbelasting"
							]
						},
						{
							"title": "Financiële hulp",
							"lead": [
								{
									"t": "text",
									"v": "ontzorger u op het gebied van financiën"
								},
								{ "t": "br" },
								{
									"t": "text",
									"v": "hier kunt u terecht met vrijwel al uw hulpvragen."
								}
							],
							"href": "/financiele-hulp.html",
							"icon": "growing-chart",
							"items": [
								"Budgetbeheer-en coaching",
								"Schuldhulpverlening",
								"Toeslagen en tegemoetkomingen",
								"Financiële planning"
							]
						},
						{
							"title": "Ondersteuning",
							"lead": [
								{
									"t": "text",
									"v": "ontzorger op operationeel en digitaal vlak"
								},
								{ "t": "br" },
								{
									"t": "text",
									"v": "hier kunt u terecht met vrijwel al uw randzaken."
								}
							],
							"href": "/ondersteuning.html",
							"icon": "setting",
							"items": [
								"Operationele hulp",
								"Websitebeheer & onderhoud",
								"Search engine optimalisatie",
								"Social media support"
							]
						}
					]
				},
				{
					"t": "testimonials",
					"items": [
						{
							"quote": "Op het gebied van financieel en creditmanagement heeft LUCIAN onze bedrijven meermaals zeer succesvol kunnen ondersteunen. De uitgebreide adviezen en ter kennisgevingen helpen de ondernemer om de stand van zaken rondom het bedrijf goed in kaart te brengen, soms ook even realistisch 'the downside' aanstippend. Ik waardeer het enorm wat LUCIAN bijdraagt aan het inzicht in het bedrijf en we proberen deze informatie uit te buiten tot verbetering van onze bedrijven.",
							"name": "Compudivision & Canome B.V.",
							"role": "Webdevelopment & Speciaalzaken voor huisdieren"
						},
						{
							"quote": "Andries stelt zich -binnen de mogelijkheden die de werkzaamheden bieden- naar de opdrachtgever toe flexibel op. In goed persoonlijk overleg is het mogelijk om de dienstverlening te stroomlijnen ten aanzien van de werkwijze van de opdrachtgever. Samenwerking met Andries geeft een welkome verlichting in de werkdruk van de opdrachtgever.",
							"name": "Dieetook",
							"role": "Dieetvoeding specialist"
						},
						{
							"quote": "Ik werk inmiddels al een aantal jaar met Andries samen en ben nog steeds erg tevreden. Hij heeft veel kennis van zaken als het gaat om de Belastingdienst en denkt echt met je mee. Daarnaast werkt hij snel en reageert hij meestal nog dezelfde dag, en anders altijd binnen 24 uur – wat ontzettend prettig is bij administratieve zaken. Wat ik extra waardeer, is zijn inzet bij spoedklussen. Hij zet net dat stapje extra om dingen op tijd en goed geregeld te krijgen. Absoluut een aanrader!",
							"name": "Support Point",
							"role": "Administratiekantoor en organisatieadvies"
						}
					]
				}
			]
		},
		{
			"id": 46,
			"path": "/belastingadviseur.html",
			"title": "Belastingadviseur Winschoten | LUCIAN",
			"description": "Dé belastingadviseur in Winschoten en regio Oldambt. LUCIAN helpt ondernemers en particulieren met fiscaal advies en aangiften. Minimaliseer uw belastingdruk!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Belastingadviseur"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Zowel zakelijk als privé de belastingdruk zo laag mogelijk!"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Moeite met het doorgronden van de complexe wet op de inkomstenbelasting? Raakt u de weg kwijt in de voortdurend veranderende regels rondom de omzetbelasting? Of bent u op zoek naar een helder antwoord op de vraag of het fiscaal aantrekkelijker is een bedrijfsmiddel op de balans of juist daarbuiten te houden?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Fiscale vraagstukken kunnen een flinke wissel trekken op uw tijd en energie. Een gedegen fiscale basis, die constant up-to-date wordt gehouden door middel van permanente educatie, zorgt ervoor dat ik u met vrijwel iedere fiscale hulpvraag kan ondersteunen."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik geloof in een proactieve aanpak: niet alleen achteraf de cijfers invullen, maar vooraf meedenken om uw belastingdruk zo laag mogelijk te houden."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Zakelijk belastingadvies: grip op uw onderneming"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als ondernemer wilt u doen waar u goed in bent: ondernemen. De fiscale rompslomp die daarbij komt kijken, kan echter overweldigend zijn. Of u nu een startende zzp'er bent of een gevestigde MKB-ondernemer met een BV-structuur, de belastingwetgeving biedt kansen die vaak onbenut blijven."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik help u niet alleen bij het voldoen aan uw verplichtingen, maar adviseer u ook over strategische keuzes. Denk hierbij aan investeringsaftrek of de optimale verhouding tussen salaris en dividend."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "U kunt bij mij terecht voor alles wat te maken heeft met de volgende belastingwetten:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Inkomstenbelasting"
								}]
							}, {
								"t": "text",
								"v": ": benut u alle aftrekposten, zoals de zelfstandigenaftrek en startersaftrek, optimaal?"
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Loonbelasting"
								}]
							}, {
								"t": "text",
								"v": ": advies over de werkkostenregeling (WKR) en een vlekkeloze administratie voor uw personeel."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Vennootschapsbelasting"
								}]
							}, {
								"t": "text",
								"v": ": voor een rechtspersoon is een nauwkeurige jaarrekening en aangifte essentieel voor een gezonde bedrijfsvoering."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Omzetbelasting"
								}]
							}, {
								"t": "text",
								"v": ": voorkom fouten in uw periodieke aangifte en zorg voor een correcte verwerking van buitenlandse prestaties."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Dividendbelasting"
								}]
							}, {
								"t": "text",
								"v": ": begeleiding bij winstuitkeringen en de daarbij behorende fiscale verplichtingen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Successiewet (schenk-en erfrecht)"
								}]
							}, {
								"t": "text",
								"v": ": heeft u plannen voor bedrijfsopvolging of wilt u vermogen overdragen aan de volgende generatie? Ik beschik over de benodigde know-how om dit zo fiscaal vriendelijk mogelijk te structureren."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Particulier belastingadvies: haal het maximale uit uw aangifte"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "De jaarlijks terugkerende aangifte inkomstenbelasting is voor velen een bron van ergernis. Hoewel de Belastingdienst de aangifte tegenwoordig grotendeels vooraf invult, is dit zeker geen garantie voor een optimale uitkomst. De vooraf ingevulde gegevens zijn vaak onvolledig, zeker wanneer er sprake is van een eigen woning, wisselende inkomsten of specifieke zorgkosten."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Om echt het maximale uit uw aangifte te halen, zou u zichzelf doorlopend op de hoogte moeten houden van fiscale ontwikkelingen. Voor de meeste mensen is dat geen haalbare kaart; u heeft immers wel wat anders te doen!"
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom LUCIAN uw aangifte laten verzorgen?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Waarom zou u het risico lopen dat u geld laat liggen of, erger nog, achteraf met naheffingen wordt geconfronteerd? LUCIAN houdt uw fiscale huishouding nauwlettend in de gaten. Dit betekent dat we niet alleen in maart of april contact hebben, maar gedurende het hele jaar indien uw situatie wijzigt."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Mijn dienstverlening voor particulieren omvat onder andere:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Verzorgen van de aangifte inkomstenbelasting"
								}]
							}, {
								"t": "text",
								"v": ": zorgvuldig en met oog voor alle mogelijke aftrekposten."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Voorlopige aanslag"
								}]
							}, {
								"t": "text",
								"v": ": veranderingen in uw leven, zoals een nieuwe baan of een verhuizing, vragen om een tijdige aanpassing van uw voorlopige aanslag om verrassingen te voorkomen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Toeslagen & kindgebonden budget"
								}]
							}, {
								"t": "text",
								"v": ": veel mensen lopen geld mis omdat ze niet weten waar ze recht op hebben, of moeten juist terugbetalen omdat hun inkomen is gestegen. Ik zorg voor een nauwkeurige afstemming van uw zorg-, huur- en kinderopvangtoeslag."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Aangifte erfbelasting"
								}]
							}, {
								"t": "text",
								"v": ": een emotionele periode is niet het moment om u te verdiepen in de successiewet. Ik neem u de administratieve last uit handen en zorg voor een correcte aangifte."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Uw fiscaal partner: eenmalig of structureel"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Kort door de bocht kan ik u bijstaan wanneer u behoefte heeft aan eenmalig advies bij een grote financiële beslissing, of wanneer u de volledige controle over uw fiscale huishouding uit handen wilt geven. Door mijn proactieve werkwijze pas ik, indien nodig, halverwege het jaar uw voorlopige aanslag of toeslagen aan. Zo blijft u altijd in control en weet u precies waar u aan toe bent."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Samen zorgen we ervoor dat u nooit meer belasting betaalt dan strikt noodzakelijk!"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bedankt voor uw interesse en het beschikbaar stellen van uw tijd. Mocht u ondanks bovenstaande informatie nog met vragen zitten, dan nodig ik u van harte uit contact met mij op te nemen."
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Met vriendelijke groet,"
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Andries"
								}]
							}
						]
					}
				]
			}]
		},
		{
			"id": 50,
			"path": "/financiele-hulp.html",
			"title": "LUCIAN Financiële hulp: brengt uw financiën weer op orde",
			"description": "Financiële hulp nodig? LUCIAN stabiliseert uw situatie met deskundige hulp, advies en budgetbeheer op maat. Neem contact op voor een persoonlijk intakegesprek.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Financiële hulp"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Professionele financiële hulp en deskundig advies"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Heeft u het overzicht over uw financiën verloren, kampt u met oplopende betalingsachterstanden of ziet u door de bomen het (financiële) bos niet meer?"
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": " Financiële zorgen kunnen een enorme impact op uw dagelijks leven, uw nachtrust en uw onderneming hebben. Ik begrijp dat de drempel om hulp te vragen hoog kan zijn, maar ik weet ook dat tijdig ingrijpen de sleutel is naar een stabiele toekomst."
							}
						]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Mijn missie is om rust en structuur terug te brengen in uw financiële situatie. Of het nu gaat om complexe schuldenproblematiek of het simpelweg op orde brengen van uw maandelijkse budget; ik sta u bij met raad en daad."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Deskundige ondersteuning voor een zorgeloze financiële toekomst"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "AVerder kijken dan alleen de cijfers op papier, de oorzaak van ontstane problemen zoeken en duurzame oplossingen bieden die passen bij uw unieke omstandigheden."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik ondersteun u met de volgende oplossingen:"
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Budgetbeheer-en coaching"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wilt u voorkomen dat u (opnieuw) in de financiële problemen komt? Mijn budgetbeheer biedt de structuur die u nodig heeft. Samen stellen we een realistisch budgetplan op waarin inkomsten en uitgaven in balans zijn. Daarnaast bied ik intensieve coaching om uw financiële vaardigheden te vergroten, zodat u op termijn zelfstandig gezonde keuzes kunt (blijven) maken."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/financiele-hulp/budgetbeheer-en-coaching.html",
							"c": [{
								"t": "text",
								"v": "Krijg weer overzicht en breng uw inkomsten en uitgaven in balans >>>"
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Schuldhulpverlening"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Problematische schulden kunnen verlammend werken. Mijn schuldhulpverlening is erop gericht om de vicieuze cirkel van rente en incassokosten te doorbreken. Ik treed op als deskundig bemiddelaar tussen u en uw schuldeisers."
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": " Het doel?; werkbare afspraken maken, een saneringsplan opstellen en toewerken naar een situatie waarin u weer schuldenvrij door het leven kunt gaan."
							}
						]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/financiele-hulp/schuldhulpverlening.html",
							"c": [{
								"t": "text",
								"v": "Ontdek hoe ik u stap voor stap help om van uw schulden af te komen >>>"
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Toeslagen en tegemoetkomingen"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het aanvragen van extra financiële steun kan complex en onoverzichtelijk zijn, waardoor er vaak onnodig geld blijft liggen. Als onderdeel van mijn bredere ondersteuning bij uw geldzaken, help ik u professioneel en daadkrachtig wegwijs te worden in deze regelingen. Ik zoek nauwkeurig uit waar u recht op heeft en organiseer de aanvragen, zodat we samen bouwen aan een gezonde, stabiele basis."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/financiele-hulp/toeslagen-en-tegemoetkomingen.html",
							"c": [{
								"t": "text",
								"v": "Ontdek op welke toeslagen en tegemoetkomingen u recht heeft en laat geen geld meer liggen >>>"
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Financiële planning"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Voor zowel ambitieuze ondernemers als particulieren is een blik op de toekomst essentieel. Hoe staat uw vermogen er over 10 jaar voor? Is uw pensioen goed geregeld? Ik breng uw fiscale mogelijkheden en financiële doelen in kaart. Een goed doordacht plan geeft de vrijheid om te ondernemen en te leven zonder onvoorziene financiële verrassingen."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/financiele-hulp/financiele-planning.html",
							"c": [{
								"t": "text",
								"v": "Bouw aan een financieel plan dat naadloos aansluit op uw persoonlijke doelen >>>"
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom kiezen voor LUCIAN?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het inschakelen van financiële hulp is een kwestie van vertrouwen. Ik hanteer een nuchtere, transparante werkwijze waarbij u als mens centraal staat. De voordelen van mijn aanpak op een rij:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Persoonlijke betrokkenheid"
								}]
							}, {
								"t": "text",
								"v": ": geen nummer, maar een gezicht. Ik luister naar uw verhaal en pas mijn advies daarop aan."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Snelheid en daadkracht"
								}]
							}, {
								"t": "text",
								"v": ": financiële problemen lossen zich niet vanzelf op. Ik onderneem direct actie om verdere escalatie te voorkomen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Volledige transparantie"
								}]
							}, {
								"t": "text",
								"v": ": u behoudt altijd inzicht in uw eigen dossier en de voortgang van mijn werkzaamheden."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Rust en focus"
								}]
							}, {
								"t": "text",
								"v": ": terwijl ik de gesprekken met instanties en schuldeisers voer, kunt u zich (weer) focussen op uw gezin of uw onderneming."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Zet vandaag de stap naar financiële rust"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wilt u weten welke van mijn diensten het beste aansluit bij uw huidige behoeften? Wacht niet tot de problemen groter worden."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Financiële vrijheid begint met het nemen van de eerste stap. Laat mij u helpen om die stap vandaag nog te zetten.\""
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Vrijblijvend kennis maken?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Neem vandaag nog contact met mij op voor een vertrouwelijk en vrijblijvend adviesgesprek. Ik bespreek graag hoe ik uw financiële basis weer solide kunnen maken."
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Met vriendelijke groet,"
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Andries"
								}]
							}
						]
					}
				]
			}]
		},
		{
			"id": 76,
			"path": "/contact.html",
			"title": "LUCIAN : Contact - LUCIAN",
			"description": "Contactformulier",
			"sections": [{
				"t": "prose",
				"variant": "bare",
				"width": "wide",
				"blocks": [
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "heading",
						"level": 1,
						"accent": false,
						"size": 1.2,
						"strong": true,
						"align": "center",
						"c": [{
							"t": "text",
							"v": "Contactformulier"
						}]
					},
					{ "t": "contactForm" }
				]
			}]
		},
		{
			"id": 84,
			"path": "/administratiekantoor/ao-ib.html",
			"title": "Administratieve Organisatie en Interne Beheersing",
			"description": "Krijg (weer) grip op uw bedrijfsvoering; optimaliseer uw Administratieve Organisatie en Interne Beheersing voor meer efficiëncy.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Administratieve Organisatie en Interne Beheersing (AO/IB)"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Grip op uw bedrijfsvoering"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Een gezonde onderneming draait op meer dan alleen goede intenties; het draait op processen die naadloos op elkaar aansluiten. Veel ondernemers ervaren echter dat naarmate hun bedrijf groeit, de interne processen minder transparant worden. Hier komen Administratieve Organisatie (AO) en Interne Beheersing (IB) om de hoek kijken. Voor velen klinkt dit als droge kost, maar ik maak dit tastbaar."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Mijn missie is hierbij simpel: helder in cijfers en nuchter als ontzorger."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Door middel van analyse, deconstructie, reconstructie en auditing van de processen binnen uw organisatie, help ik u om weer volledige controle te krijgen. Het doel is niet om extra bureaucratie te creëren, maar juist om ballast te verwijderen en de efficiëntie te verhogen."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wat is Administratieve Organisatie (AO) precies?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "In de Administratieve Organisatie (AO) leggen we de fundamenten van uw bedrijfsvoering vast. Dit omvat alle processen, procedures, instructies, taken, bevoegdheden en verantwoordelijkheden. Het resultaat van dit traject is vaak een set handboeken die fungeren als de 'gebruiksaanwijzing' van uw onderneming. Deze documenten richten zich op het beschrijven van diverse processen, het toewijzen van de juiste verantwoordelijkheden aan de juiste mensen en het beheersen van alle informatiestromen."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Praktijkvoorbeeld: de klachtenprocedure"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Om het abstracte begrip AO te verduidelijken, kijken we naar een alledaags proces: de klachtenprocedure. Bij een internationale multinational is dit een complex web van afdelingen, terwijl het bij een compact familiebedrijf een overzichtelijke procedure is."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Voor de AO brengen we in kaart via welke kanalen klachten binnenkomen, welke functionarissen een rol spelen bij de afwikkeling en hoe de informatiestroom (zoals formulierenbeheer) eruitziet. Het doel? Klachten zo efficiënt, professioneel en klantvriendelijk mogelijk afhandelen. Een slecht afgehandelde klacht leidt tot omzetverlies, en dat is precies wat we met een nuchtere aanpak willen voorkomen."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Efficiënte inkoop-, verkoop- en productieprocessen"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Naast de klachtenafwikkeling zijn er talloze andere processen die cruciaal zijn voor uw rendement. Denk hierbij aan uw inkoopproces, het verkoopproces en het primaire productieproces. Wanneer deze processen niet goed op elkaar zijn afgestemd, ontstaat er ruis, verlies van tijd en uiteindelijk verlies van kapitaal."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik help u om weer zicht en controle te krijgen op de informatievoorziening. Ik deconstrueer de huidige werkwijze om te zien waar de knelpunten zitten en reconstrueer deze tot een geoliede machine. Zo gaan de verschillende onderdelen van uw organisatie niet alleen individueel beter presteren, maar functioneert het bedrijf (weer) als één krachtig geheel."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Interne Beheersing (IB): een continu proces van verbetering"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het vastleggen van de AO is geen eenmalige exercitie die daarna in een lade verdwijnt. Uw organisatie is, net als de markt om u heen, constant in beweging. Wat vandaag werkt, kan morgen achterhaald zijn. Interne Beheersing (IB) is daarom een continu proces. Om het optimale uit uw inspanningen te blijven halen, moeten we de processen periodiek tegen het licht houden en bijsturen waar nodig."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Werken met de PDCA-cyclus van Deming"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als nuchtere ontzorger maak ik graag gebruik van beproefde instrumenten zoals de PDCA-cyclus (Plan-Do-Check-Act), ook wel de Deming-circle genoemd. Deze methode zorgt voor een heldere structuur in uw kwaliteitsmanagement:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Plan"
								}]
							}, {
								"t": "text",
								"v": ": in deze fase omschrijven we de doelstellingen. Hoe ziet de ideaalsituatie eruit? We leggen deze naast de huidige realiteit en identificeren de verbeterpunten. Deze vertalen we vervolgens naar praktische, werkbare oplossingen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Do"
								}]
							}, {
								"t": "text",
								"v": ": hier gaan we over tot actie. De oplossingen worden in de praktijk gebracht. Dit kan betekenen dat we een nieuw formulier introduceren, een overbodige stap uit een proces verwijderen of een medewerker nieuwe handvatten geven voor zijn of haar takenpakket."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Check"
								}]
							}, {
								"t": "text",
								"v": ": meten is weten. We controleren of de resultaten overeenkomen met het plan. Dit doen we door metingen te verrichten, feedback te vragen aan betrokkenen of zelfs een 'mystery guest' het proces te laten doorlopen. Zo krijgen we de cijfers helder op tafel."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Act"
								}]
							}, {
								"t": "text",
								"v": ": op basis van de check sturen we bij. Als het resultaat voldoet of de planning overtreft, borgen we de nieuwe werkwijze. Voldoet het resultaat niet? Dan doorlopen we de cyclus opnieuw om de puntjes op de i te zetten."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Uw AO/IB professioneel geregeld"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Door uw processen regelmatig te laten auditen en bij te stellen, bouwt u aan een organisatie die niet alleen vandaag goed functioneert, maar ook klaar is voor de uitdagingen van de toekomst. Het geeft u als ondernemer de rust en het vertrouwen dat de interne organisatie solide staat."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Mijn rol hierin is die van de nuchtere expert die van buitenaf naar binnen kijkt. Ik zie vaak blinde vlekken die voor interne medewerkers onzichtbaar zijn geworden. Geen dikke, onleesbare rapporten, maar heldere instructies en praktische handboeken waar uw team direct mee aan de slag kan."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Neem contact op voor meer controle en (in)zicht"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bedankt voor uw interesse in de manier waarop ik organisaties help te professionaliseren. Heeft u het gevoel dat de processen binnen uw bedrijf efficiënter kunnen, of wilt u eindelijk eens die administratieve organisatie goed vastgelegd hebben?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik nodig u van harte uit om contact met mij op te nemen voor een vrijblijvend gesprek. Laten we samen kijken hoe we uw organisatie naar een hoger plan kunnen tillen met een aanpak die staat voor helderheid en echte ontzorging."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 86,
			"path": "/administratiekantoor/bedrijfseconomisch-advies.html",
			"title": "Bedrijfseconomisch advies | LUCIAN",
			"description": "Bedrijfseconomisch advies nodig? LUCIAN helpt uw onderneming groeien met strategisch inzicht, financiële planning en rendement. Neem direct contact op!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Bedrijfseconomisch advies"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Optimaliseer uw rendement en groei"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Elke ondernemer streeft naar een gezond rendement, maar de weg daarnaartoe is vaak complexer dan het op het eerste gezicht lijkt. Het draait niet alleen om 'hard werken', maar vooral om 'slim sturen'. Hoe haalt u het maximale uit uw beschikbare middelen? Waar liggen de verborgen kosten en waar de onbenutte kansen?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bij LUCIAN ondersteun ik ondernemers bij het beantwoorden van deze cruciale vraagstukken. Mijn aanpak is daarbij altijd: helder in cijfers en nuchter als ontzorger."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bedrijfseconomisch advies is bij mij geen abstract theoretisch verhaal, maar een praktische vertaalslag naar de dagelijkse praktijk. Samen kijken we naar de cijfers achter uw onderneming om te ontdekken hoe we uw resultaat kunnen verbeteren en uw positie in de markt kunnen versterken."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Kostprijscalculatie: de basis voor een gezonde marge"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Een van de meest gestelde vragen door ondernemers is: \"Wat moet mijn product of dienst minimaal kosten?\" Een ogenschijnlijk simpele vraag, maar de werkelijkheid is vaak weerbarstig. Om een gezonde winstmarge te garanderen, is een diepgaand inzicht in uw kostenstructuur essentieel."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Tijdens een kostprijscalculatie kijken we samen naar de wijze waarop u kosten het beste kunt doorberekenen aan uw producten, diensten of activiteiten. We analyseren de verhouding tussen vaste en variabele lasten en bepalen op basis van harde data wat de optimale verkoopprijs is. Helderheid in deze cijfers zorgt ervoor dat u niet alleen omzet draait, maar ook daadwerkelijk onder de streep overhoudt wat u verdient."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Strategische investeringsselectie"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Investeren is vooruitzien, maar het brengt ook risico's met zich mee. Waarin kunt u uw middelen op dit moment het best renderend investeren? Is het verstandig om een nieuwe machine aan te schaffen met eigen middelen, of is de huidige rentevoet zodanig dat vreemd vermogen op dit moment aantrekkelijker is?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als nuchtere ontzorger help ik u bij het maken van deze keuzes. We kijken niet alleen naar de korte termijn, maar berekenen de terugverdientijd en de impact op uw liquiditeit op de lange termijn. Is het überhaupt verstandig om op dit moment in een nieuwe venture of bedrijfsmiddel te stappen, of is het beter om een buffer op te bouwen? Ik bied u het objectieve inzicht dat nodig is om met een gerust hart 'ja' of 'nee' te zeggen tegen een investering."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Financieringsselectie en herstructurering"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "De inrichting van uw financiering is bepalend voor de wendbaarheid van uw onderneming. Soms kan het zeer voordelig zijn om uw financiering anders in te richten of om meer controle en sturing aan te brengen in de verhouding tussen eigen en vreemd vermogen."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Staat er misschien te veel overbodig vreemd vermogen op de balans? Dan kan het verstandig zijn om dit aandeel te reduceren om de rentelasten te verlagen en de solvabiliteit te verbeteren. Ik adviseer u nuchter over de mogelijkheden van herstructurering, zodat uw balans weer in evenwicht komt en uw onderneming financieel weerbaar blijft."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Liquiditeits- en resultatenbegroting: grip op de toekomst"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Niets is zo vervelend voor een ondernemer als een onverwacht liquiditeitstekort, terwijl de zaken ogenschijnlijk goed gaan. Winst op papier betekent immers niet direct geld op de bank. Met een gedegen liquiditeitsbegroting brengen we in kaart op welke momenten in het boekjaar u een overschot of een tekort kunt verwachten."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Door vooruit te kijken, kunnen we tijdig bepalen of het nodig is om extern kort vreemd vermogen aan te trekken om incidentele dipjes op te vangen. Daarnaast kijken we naar de resultatenbegroting: hoe ontwikkelt uw winst zich gedurende het jaar en wat is de prognose voor het eindresultaat? Deze vorm van bedrijfseconomisch advies zorgt ervoor dat u nooit voor verrassingen komt te staan en altijd proactief kunt bijsturen."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Advies als maatwerk: geen standaardprocedures"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het verstrekte advies en de manier waarop dit tot stand komt, is volledig afhankelijk van uw specifieke hulpvraag. Het bepalen van een verkoopprijs is bijvoorbeeld afhankelijk van diverse factoren zoals de sector waarin u actief bent, de regio waar u uw diensten aanbiedt en de kracht van uw concurrentie."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Kortom: bedrijfseconomisch advies is maatwerk. Het is onmogelijk om dit vast te leggen in een starre standaardprocedure. Elke onderneming is anders en elke ondernemer heeft andere ambities. Juist in dat maatwerk bewijs ik mijn waarde als nuchtere ontzorger; ik kijk naar wat úw bedrijf nodig heeft om te floreren, zonder onnodige opsmuk."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom kiezen voor LUCIAN voor uw advies?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wanneer u besluit gebruik te maken van het advies van LUCIAN, kiest u voor een partner die naast u staat. Ik combineer diepgaande analytische vaardigheden met een nuchtere, praktische blik op zaken doen. Geen hoogdravende rapporten die in de la belanden, maar heldere cijfers en concrete adviezen waar u direct mee aan de slag kunt om uw rendement te verhogen."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Mijn jarenlange ervaring in diverse sectoren stelt mij in staat om snel tot de kern van een probleem door te dringen. Of het nu gaat om een eenmalig vraagstuk over een investering of om een structurele periodieke doorlichting van uw resultaten, ik sta voor u klaar."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Neem vrijblijvend contact op"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bedankt voor uw interesse en de tijd die u heeft genomen om u te verdiepen in mijn dienstverlening op het gebied van bedrijfseconomisch advies. Wilt u een gedetailleerde indruk krijgen van mijn werkwijze en ontdekken wat ik specifiek voor uw onderneming kan betekenen?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik nodig u uit om telefonisch of via e-mail contact met mij op te nemen voor een verkennend gesprek. Laten we samen uw rendement optimaliseren met een aanpak die staat voor helderheid en rust."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 88,
			"path": "/administratiekantoor/financiele-administratie.html",
			"title": "Financiële administratie uitbesteden?; uw nuchtere ontzorger",
			"description": "Uw financiële administratie uitbesteden? LUCIAN biedt helder inzicht en nuchtere ontzorging voor MKB en ZZP. Krijg weer rust en tijd om te ondernemen",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Financiële administratie"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "De basis voor succesvol ondernemen"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Veel ondernemers zien het opzetten en up-to-date houden van een financiële administratie als een noodzakelijk kwaad. Periodiek worden de cijfers met de nodige tegenzin in een softwarepakket gestampt, om vervolgens zo snel mogelijk weer over te gaan tot de orde van de dag: het ondernemen zelf. Toch is die administratie veel meer dan een wettelijke verplichting; het is de blauwdruk van uw gehele bedrijfsvoering en de basis voor elke belangrijke beslissing die u neemt."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik bekijk cijfers vanuit een ander perspectief; waar de doorsnee ondernemer stopt, begin ik als cijfer-enthousiasteling pas echt. Een goede boekhouding is namelijk het startpunt van waaruit toegewerkt wordt naar uw persoonlijke ideaalsituatie."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Mijn aanpak hierin is simpel, transparant en effectief: \"helder in cijfers en nuchter als ontzorger\"."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "De kracht van actuele en betrouwbare cijfers"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "De ideale toestand voor elke ondernemer is een situatie waarin de verhouding tussen inspanning en rendement optimaal is. U wilt immers maximaal resultaat behalen met de middelen en de tijd die u inzet. Deze balans is onmogelijk te bereiken én te behouden zonder een gedegen en betrouwbare administratie. Zonder actueel inzicht vaart u immers blind op uw eigen onderbuikgevoel, wat in een groeiende onderneming riskant kan zijn."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ongeacht de branche of markt waarin u actief bent: cijfers liegen niet. Ze vertellen u precies waar de kansen liggen, waar onnodige kosten worden gemaakt en hoe uw cashflow er daadwerkelijk voor staat op de lange termijn. Het beschikken over actuele stuurinformatie maakt of breekt een onderneming. Door uw administratie bij mijn kantoor onder te brengen, kiest u voor objectiviteit, kwaliteit en bovenal rust in uw hoofd. Ik vertaal complexe data naar begrijpelijke taal, zodat u precies weet waar u aan toe bent."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Uw boekhouding uitbesteden: maatwerk voor elke ondernemer"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Iedere ondernemer is uniek en dat geldt ook voor de manier waarop de administratie wordt ingericht. De behoeften van een zzp'er verschillen nu eenmaal van die van een groeiend mkb-bedrijf. Om u optimaal te ondersteunen, bied ik verschillende vormen van dienstverlening aan. Het doel is altijd hetzelfde: u de ruimte geven om te doen waar u goed in bent, terwijl ik zorg dat de achterkant perfect geregeld is. Juist in die rol als stabiele factor op de achtergrond kom ik tot mijn recht als uw nuchtere ontzorger."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Volledige ontzorging van uw boekhouding"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wilt u nergens meer omkijken naar hebben? U levert uw facturen en bonnen eenvoudig digitaal of schriftelijk aan, en ik verwerk deze tot een sluitende administratie. Ik werk met diverse moderne softwarepakketten, waardoor we altijd een systeem vinden dat naadloos aansluit bij uw dagelijkse workflow. Zo heeft u altijd en overal inzicht in uw resultaten, zonder dat het u een minuut extra tijd kost."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Persoonlijk en direct: boekhouding op locatie"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Soms is het prettig om de lijnen kort te houden en direct overleg te plegen boven de boeken op uw eigen kantoor. In dat geval kom ik bij u op locatie de administratie bijwerken. Dit biedt het grote voordeel dat we direct kunnen schakelen bij vragen en ik een nog beter gevoel krijg bij de dagelijkse gang van zaken binnen uw organisatie. Het is een praktische, nuchtere manier van samenwerken die voor veel ondernemers in de regio uitstekend werkt."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Zelf uw boekhouding doen met professionele ondersteuning"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Houdt u de touwtjes liever zelf in handen, maar wilt u wel de zekerheid van een professionele inrichting? Ik help u bij het opzetten van de gehele administratieve structuur en het kiezen van de juiste software. Nadat het fundament staat, kunt u het dagelijkse beheer zelf overnemen. Hierbij blijf ik op de achtergrond altijd beschikbaar voor advies, complexe vraagstukken en fiscale ondersteuning wanneer u dat nodig heeft."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Periodieke controle: voorkom fouten en boetes"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wanneer u zelf uw boekhouding voert, is een periodieke check door een professional essentieel om fouten en boetes te voorkomen. Ik voer nauwkeurige controles uit om te garanderen dat alles volgens de laatste fiscale regels en wetgeving is verwerkt. Dit voorkomt onaangename verrassingen bij belastingcontroles en geeft u de absolute zekerheid dat uw jaaroverzicht een getrouw beeld geeft van de werkelijkheid. Helderheid in cijfers is hierbij mijn onvoorwaardelijke belofte aan u."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Hulp bij administratieve achterstanden"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het overkomt de beste ondernemer: door extreme drukte, snelle groei of onvoorziene privéomstandigheden blijft de administratie even liggen. Voor u het weet, groeit de stapel papierwerk en verliest u het overzicht over wat er nog betaald moet worden of wat er nog binnen moet komen. Geen paniek; als nuchtere ontzorger stroop ik de mouwen op om deze achterstanden snel en efficiënt weg te werken. Ik sorteer, orden en boek alles in, zodat u op korte termijn weer met een schone lei, een helder overzicht en actuele cijfers verder kunt bouwen aan uw succes."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Mijn aanpak: helder in cijfers, nuchter als ontzorger"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Samenwerken met een specialist betekent investeren in de stabiliteit en toekomst van uw bedrijf. Door mijn passie voor cijfers en jarenlange ervaring binnen de administratieve sector, bied ik meer dan alleen het simpelweg inkloppen van facturen. Ik denk proactief met u mee over procesoptimalisatie, slimme kostenbesparingen en fiscale mogelijkheden die specifiek voor uw sector relevant zijn."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik maak gebruik van de nieuwste technologische ontwikkelingen om uw processen te versnellen en te digitaliseren, maar verlies daarbij nooit het menselijke aspect uit het oog. Geen ingewikkelde rapportages vol jargon waar u niets mee kunt, maar duidelijke taal, korte lijnen en bruikbare inzichten."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Neem contact op voor een vrijblijvende kennismaking"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bedankt voor uw interesse en de tijd die u heeft genomen om mijn visie op financiële administratie te lezen. Bent u klaar voor een boekhouding die voor u werkt in plaats van andersom? Heeft u specifieke vragen over uw huidige situatie of wilt u direct weten hoe ik uw onderneming nuchter kan ontzorgen?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik nodig u van harte uit om contact met mij op te nemen voor een vrijblijvend kennismakingsgesprek."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Laten we samen zorgen voor een administratie die u de rust, de tijd en het inzicht geeft die u verdient om optimaal te kunnen ondernemen."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 90,
			"path": "/administratiekantoor/quickscan.html",
			"title": "Quickscan Bedrijfsvoering: Direct Resultaat & Quickwins",
			"description": "Optimaliseer uw bedrijfsvoering met de Quickscan van LUCIAN. Krijg in korte tijd grip op uw interne processen, financiën en ontdek direct bruikbare quickwins.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Quickscan"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Direct inzicht in uw besparings- en verbeterpotentieel"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Veel ondernemers herkennen het wel: de zaken lopen op zich prima, maar er knaagt een onbestemd gevoel. Een gevoel dat processen efficiënter kunnen, dat de marges ergens wegsijpelen of dat de organisatie simpelweg niet op volle toeren draait. U heeft misschien geen acuut probleem of een specifiek omschreven hulpvraag, maar u weet dat er meer uit uw onderneming te halen valt. Voor de ondernemer die met dit gevoel rondloopt, heb ik de Quickscan (QS) ontwikkeld."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met de Quickscan breng ik rust en overzicht in uw organisatie. Mijn aanpak is, zoals u van mij mag verwachten, helder in cijfers en nuchter als ontzorger. Ik ga niet gissen, maar analyseren op een praktische manier waar de winstpunten liggen."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Hoe werkt de Quickscan? Een gestructureerde aanpak"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "De Quickscan is een krachtig instrument om in korte tijd de vinger op de zere plek te leggen, zonder dat u direct een langdurig en kostbaar adviestraject instapt. Ik werk hierbij volgens het principe 'van grof naar fijn'. We beginnen (want het blijft een samenwerking) bij de basis (de ruwbouw) en werken stap voor stap toe naar de details (de afbouw). Op deze manier blijft het onderzoek beheersbaar, transparant en resultaatgericht."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Stap 1: het persoonlijke kennismakingsgesprek"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "We springen natuurlijk niet blind in het diepe. Elke succesvolle samenwerking begint bij vertrouwen en wederzijds begrip. Tijdens een uitgebreid kennismakingsgesprek verkennen we uw onderneming en mijn werkwijze. Ik leer uw visie en uw organisatie kennen, en u krijgt een helder beeld van wat u van mij als nuchtere ontzorger kunt verwachten. Pas als er een klik is en de doelen helder zijn, gaan we van start."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Stap 2: de globale scan van uw organisatie"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Na de kennismaking start ik met een breed, oriënterend onderzoek. Dit is een vorm van bureauonderzoek waarbij ik uw organisatie van een afstand bekijk om de grote lijnen te ontdekken. Dit onderzoek richt zich op verschillende cruciale pijlers van uw bedrijfsvoering:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": [],
								"c": [{
									"t": "text",
									"v": "Financiële gezondheid"
								}]
							}, {
								"t": "text",
								"v": ": analyse van bedrijfseconomische kengetallen en ratio's."
							}],
							[{
								"t": "span",
								"marks": [],
								"c": [{
									"t": "text",
									"v": "Financieringsstructuur"
								}]
							}, {
								"t": "text",
								"v": ": hoe staat de balans erbij en is de financiering optimaal?"
							}],
							[{
								"t": "span",
								"marks": [],
								"c": [{
									"t": "text",
									"v": "Interne processen"
								}]
							}, {
								"t": "text",
								"v": ": een blik op procedures, instructies, taken en verantwoordelijkheden (AO/IB)."
							}],
							[{
								"t": "span",
								"marks": [],
								"c": [{
									"t": "text",
									"v": "Organisatiestructuur"
								}]
							}, {
								"t": "text",
								"v": ": hoe is de leiding ingericht en past de huidige stijl bij de fase van uw bedrijf?"
							}],
							[{
								"t": "span",
								"marks": [],
								"c": [{
									"t": "text",
									"v": "Marktpositie"
								}]
							}, {
								"t": "text",
								"v": ": een analyse van de markt waarin u zich begeeft."
							}],
							[{
								"t": "span",
								"marks": [],
								"c": [{
									"t": "text",
									"v": "Commerciële organisatie"
								}]
							}, {
								"t": "text",
								"v": ": hoe effectief zijn uw marketing- en salesactiviteiten?"
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Direct resultaat door 'Quickwins'"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het mooie van de Quickscan is dat het vaak direct resultaat oplevert. Wanneer ik tijdens het globale onderzoek zogenaamde quickwins tegenkom — verbeteringen die met minimale inspanning direct resultaat boeken — breng ik u daar direct van op de hoogte. In dat geval plukt u de vruchten van het onderzoek nog voordat het volledige traject is afgerond. Dat is de nuchtere aanpak van LUCIAN: als er direct iets voor u te verbeteren valt, kunt u dat ook direct binnen uw organisatie implementeren."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ongeacht of er direct kansen liggen, presenteer ik de volledige resultaten van deze eerste scan altijd aan u. In de regel zit er ongeveer 1 tot 4 weken tussen de start van het onderzoek en de presentatie van de eerste bevindingen. U krijgt hiermee een heldere spiegel voorgehouden van uw organisatie."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Verdieping: gedetailleerde uitwerking van probleemstellingen"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "De globale scan is vaak een eye-opener en levert vrijwel altijd voldoende aanknopingspunten op voor nader, gericht onderzoek. Om het proces overzichtelijk te houden, maken we na de eerste fase een selectie. Ik bied u minimaal twee en maximaal vijf specifieke probleemstellingen aan die uit de scan naar voren zijn gekomen."
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "U kiest hieruit de "
							},
							{
								"t": "span",
								"marks": ["underline"],
								"c": [{
									"t": "text",
									"v": "twee belangrijkste probleemstellingen"
								}]
							},
							{
								"t": "text",
								"v": " die u nader uitgewerkt wilt zien. Dit zorgt ervoor dat we focussen op de zaken die voor u de meeste impact hebben. De gedetailleerde uitwerking van deze punten neemt gewoonlijk tussen de 2 en 8 weken in beslag."
							}
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Rapportage en presentatie van de bevindingen"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "De uitkomsten van dit verdiepende onderzoek worden verwerkt in heldere, leesbare rapportages. Geen dikke pakken papier om het interessant te laten lijken, maar concrete feiten en bruikbare adviezen. Deze resultaten presenteer ik persoonlijk aan u, waarbij we de cijfers helder doornemen en ik u als nuchtere ontzorger adviseer over de te nemen vervolgstappen."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Van inzicht naar praktische oplossingen"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het kan natuurlijk zijn dat u na de Quickscan zo enthousiast bent dat u ook de overige probleemstellingen wilt laten uitwerken, of dat u direct hulp nodig heeft bij het vertalen van de adviezen naar de praktijk. In dat geval help ik u graag verder. Op uw verzoek stel ik een passende offerte op om de verbeteringen daadwerkelijk door te voeren binnen uw organisatie."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met de Quickscan van LUCIAN kiest u voor zekerheid. U stopt het 'onbestemde gevoel' en vervangt het door feitelijke kennis en een concreet plan van aanpak. Zo weet u zeker dat uw organisatie optimaal functioneert en klaar is voor de toekomst."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Neem de eerste stap naar verbetering"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bent u benieuwd waar de groeikansen en besparingsmogelijkheden binnen uw bedrijf liggen?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bedankt voor uw interesse in deze unieke aanpak. Ik nodig u van harte uit om contact met mij op te nemen voor een vrijblijvend eerste gesprek over de Quickscan. Laten we samen zorgen voor de helderheid die uw onderneming verdient."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 96,
			"path": "/financiele-hulp/schuldhulpverlening.html",
			"title": "Professionele schuldhulpverlening naar een schuldenvrij leven",
			"description": "Zoekt u een weg uit de schulden? LUCIAN biedt professionele schuldhulpverlening; van MSNP-traject tot WSNP. Ik help u naar een schuldenvrije toekomst.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Professionele Schuldhulpverlening"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Uw route naar een schuldenvrij leven"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wanneer schulden uw leven beheersen en u er op eigen kracht niet meer uitkomt, is het tijd voor actie. In een tijd van stijgende woonlasten en inflatie is het niet vreemd dat het hoofd boven water houden een uitdaging is. LUCIAN biedt een professionele uitweg voor wie vastloopt in de schulden."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Hoe ziet schuldhulpverlening bij LUCIAN eruit?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Mijn aanpak is gestructureerd en transparant. We doorlopen samen de volgende stappen om uw financiële vrijheid te herstellen:"
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Inventarisatie van uw schulden"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "We brengen de actuele situatie volledig in kaart. Waar liggen de schulden, welke regelingen zijn er in het verleden getroffen en zijn er incassobureaus of deurwaarders betrokken?"
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Opstellen van een realistische begroting"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "We maken een overzicht van al uw inkomsten en uitgaven. Zo krijgen we een helder beeld van wat er maandelijks binnenkomt en wat uw huishouden nodig heeft."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Vaststellen van het leefgeld"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Op basis van de begroting bepaal ik een vast bedrag aan leefgeld. Dit is bedoeld voor noodzakelijke uitgaven zoals boodschappen, persoonlijke verzorging en noodzakelijke brandstofkosten."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Bepalen van de aflossingscapaciteit"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het bedrag dat overblijft na aftrek van de vaste lasten en het leefgeld, is uw aflossingscapaciteit. Dit vormt de basis voor een betalingsvoorstel aan uw schuldeisers, doorgaans met een looptijd van 18 maanden. Na deze periode wordt het restant van de schuld kwijtgescholden, mits u zich aan alle voorwaarden houdt."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "MSNP"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wanneer schuldeisers akkoord gaan met het voorstel, starten we het zgn. MSNP-traject (Minnelijke Schuldsanering Natuurlijke Personen). Dit kan op twee manieren:"
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Schuldbemiddeling"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "U lost uw schulden af via een beheerconstructie in overeenstemming met de gemaakte afspraken met uw schuldeisers."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Schuldsanering (saneringskrediet)"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "LUCIAN verzorgt de volledige begeleiding en de aanvraag voor een saneringskrediet. Dit krediet wordt door een kredietbank beoordeeld en bij een positief besluit verstrekt. Hiermee worden uw schuldeisers direct afgekocht, waarna u de lening in termijnen aan de kredietbank terugbetaalt."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wat als schuldeisers niet meewerken? (Dwangakkoord & WSNP)"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Indien schuldeisers een redelijk voorstel weigeren, zijn er juridische stappen mogelijk:"
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Dwangakkoord"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Via de rechter kan een weigerachtige schuldeiser worden gedwongen om alsnog akkoord te gaan met het minnelijke traject."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "WSNP (Wet Schuldsanering Natuurlijke Personen):"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als het minnelijke traject niet slaagt, ondersteunt LUCIAN u bij de aanvraag voor de WSNP bij de rechtbank. Bij toelating wordt u begeleid door een WSNP-bewindvoerder om het traject succesvol af te ronden."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Neem de eerste stap naar rust"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wilt u weten wat in uw situatie de beste route is naar een schuldenvrije toekomst? Ik nodig u graag uit voor een vertrouwelijk 1-op-1 gesprek om al uw vragen te beantwoorden."
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 98,
			"path": "/info.html",
			"title": "Info - LUCIAN",
			"description": "",
			"sections": []
		},
		{
			"id": 100,
			"path": "/info/disclaimer.html",
			"title": "Disclaimer - LUCIAN",
			"description": "De informatie op deze website (https://www.luciancs.nl) is uitsluitend bedoeld als algemene informatie. Er kunnen geen rechten aan de informatie op deze",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Disclaimer"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "De informatie op deze website (https://www.luciancs.nl) is uitsluitend bedoeld als algemene informatie. Er kunnen geen rechten aan de informatie op deze website worden ontleend. Hoewel ik zorgvuldigheid in acht neem bij het samenstellen en onderhouden van deze website en daarbij gebruikmaakt van bronnen die betrouwbaar worden geacht, kan ik niet instaan voor de juistheid, volledigheid en actualiteit van de geboden informatie."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Gebruik van informatie en advies"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "De informatie op deze website is uitdrukkelijk niet bedoeld als vervanging van professioneel, specifiek of op maat gemaakt (financieel, administratief of belasting-) advies. Het gebruik van de geboden informatie is volledig voor eigen rekening en risico van de gebruiker. Voor specifiek advies dat is afgestemd op uw situatie, raad ik aan direct contact met mij op te nemen."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Aansprakelijkheid"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "LUCIAN aanvaardt geen enkele aansprakelijkheid voor directe of indirecte schade, van welke aard dan ook, die voortvloeit uit of in enig opzicht verband houdt met:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "text",
								"v": "Het gebruik van deze website of de tijdelijke onmogelijkheid om deze website te raadplegen;"
							}],
							[{
								"t": "text",
								"v": "De informatie die op of via deze website wordt aangeboden;"
							}],
							[{
								"t": "text",
								"v": "Het gebruik van informatie die door bezoekers via de website is verkregen."
							}]
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Informatie van derden, producten en diensten (externe links)"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Op de website van LUCIAN kunnen links naar websites van derden staan. Ik aanvaard geen enkele aansprakelijkheid of verantwoordelijkheid voor de inhoud, het gebruik of de beschikbaarheid van websites waarnaar wordt verwezen of die verwijzen naar deze website. Het gebruik van dergelijke links is voor eigen risico."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Intellectuele eigendomsrechten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Alle rechten van intellectuele eigendom met betrekking tot de informatie op deze website (waaronder alle teksten, grafisch materiaal, logo’s en vormgeving) berusten uitsluitend bij LUCIAN of haar licentiegevers. Het is niet toegestaan om informatie van deze website te kopiëren, te downloaden, openbaar te maken, te verspreiden of te verveelvoudigen zonder voorafgaande schriftelijke toestemming van LUCIAN, behalve voor eigen persoonlijk en niet-commercieel gebruik."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wijzigingen"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "LUCIAN behoudt zich het recht voor om de op of via deze website aangeboden informatie, met inbegrip van de tekst van deze disclaimer, te allen tijde te wijzigen zonder hiervan nadere aankondiging te doen. Het is raadzaam om periodiek te controleren of de informatie op of via deze website, inclusief deze disclaimer, is gewijzigd."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Toepasselijk recht"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Op deze website en de disclaimer is het Nederlands recht van toepassing. Alle geschillen uit hoofde van of in verband met deze disclaimer zullen bij uitsluiting worden voorgelegd aan de bevoegde rechter in Nederland."
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 102,
			"path": "/info/acties.html",
			"title": "Acties | LUCIAN",
			"description": "Bekijk alle acties en startersvoordelen van LUCIAN. Bespaar op je boekhouding, fiscaliteiten en administratie. Profiteer direct van slimme financiële deals!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Acties"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Try before you buy!"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik kan me heel goed voorstellen dat u voorzichtig te werk gaat wanneer het gaat om het uitbesteden van diensten die met uw financiën te maken hebben. Om de drempel enigszins te verlagen biedt LUCIAN (introductie)acties aan zodat u kosteloos en zonder verdere verplichtingen de diensten kunt uitproberen."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Starterspakket"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Als startend ondernemer wil je graag een goede start maken en dat kan niet wanneer je direct met onduidelijke en hoge aanloopkosten te maken krijgt."
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": " Speciaal voor de starter, die geld en tijd vrij wil houden om te investeren in zijn onderneming, heb ik het Starterspakket ontwikkeld."
							}
						]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/info/acties/starterspakket.html",
							"c": [{
								"t": "text",
								"v": "Ja, ik wil een sterke start maken..."
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Mystery Guest Scan"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als ondernemer ga je soms (te veel) op in de dagelijkse praktijk, waardoor het lastig kan zijn om objectief naar je eigen bedrijf te kijken. Kleine haperingen in communicatie, techniek of online vindbaarheid kunnen zo ongemerkt waardevolle klanten en omzet kosten."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Speciaal voor ondernemers die willen ontdekken hoe potentiële klanten hun digitale voordeur écht ervaren, heb ik de gratis Mystery Guest Scan ontwikkeld. Hiermee krijg je direct inzicht in je klantervaring, website en online communicatie."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/info/acties/mystery-guest.html",
							"c": [{
								"t": "text",
								"v": "Ja, ik wil ontdekken hoe klanten mijn bedrijf écht ervaren..."
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Hoeveel ben ik waard?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "LUCIAN biedt u eenmalig volledig zicht op uw vermogenspositie. Uw bezittingen, schulden, inkomsten en uitgaven worden volledig in kaart gebracht zodat u kosteloos antwoord krijgt op de vraag; hoeveel ben ik waard?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/info/acties/hoeveel-ben-ik-waard.html",
							"c": [{
								"t": "text",
								"v": "Krijg direct antwoord op de vraag wat u waard bent..."
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bedankt voor uw interesse en het beschikbaar stellen van uw tijd. Mocht u ondanks bovenstaande informatie nog met vragen zitten, dan nodig ik u uit contact met mij op te nemen."
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 104,
			"path": "/info/kenniscentrum.html",
			"title": "Kenniscentrum | LUCIAN",
			"description": "Welkom in het kenniscentrum, met volop informatie, tips & tricks, artikelen en reviews over alles wat met financiën, accounting en/of fiscaliteiten te maken heeft.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Kennis = Kracht"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Welkom in het kenniscentrum, met volop informatie, tips & tricks, artikelen en reviews over alles wat met financiën, accounting en/of fiscaliteiten te maken heeft."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Administratiekantoor"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "#boekhouding #financieleadministratie #jaarverslag #internebeheersing #bedrijfseconomischadvies #liquiditeitsbegroting #quickscan #verbeterpotentieel #quickwins #financiering #audit #kostprijsberekening"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/info/kenniscentrum/administratie.html",
							"c": [{
								"t": "text",
								"v": "en nog veel meer..."
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Belastingadviseur"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "#inkomstenbelasting #omzetbelasting #btw #vennootschapsbelasting #aangifte #toeslagen #loonbelasting #voorlopigeaanslag #erfbelasting #suppletie #dividendbelasting #icp"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/info/kenniscentrum/belastingen.html",
							"c": [{
								"t": "text",
								"v": "en nog veel meer..."
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Financiële hulp"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "#(problematische) schulden #schuldhulp #schuldhulpverlening #hulp bij geldzorgen #budgetbeheer #budgetcoaching #toeslagen #tegemoetkomingen #financiële planning #financiële onafhankelijkheid"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "/info/kenniscentrum/financien.html",
							"c": [{
								"t": "text",
								"v": "en nog veel meer..."
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Ondersteuning"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "#ondersteuning #virtualassistant #virtueelassistent #officemanagement #zakelijkeondersteuning #administratieveondersteuning #projectondersteuning #ontzorgen #zzpondersteuning #productiviteit #efficiënterwerken #bedrijfsvoering"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "link",
								"href": "/info/kenniscentrum/support.html",
								"c": [{
									"t": "text",
									"v": "en nog veel meer..."
								}]
							},
							{
								"t": "text",
								"v": " "
							},
							{ "t": "br" },
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 111,
			"path": "/financiele-hulp/budgetbeheer-en-coaching.html",
			"title": "Professioneel Budgetbeheer-en Coaching | LUCIAN",
			"description": "Op zoek naar grip op uw geld en rust in uw leven? LUCIAN biedt professioneel budgetbeheer en coaching op maat. Voorkom extra kosten en herstel uw balans.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Budgetbeheer-en coaching"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Grip op uw geld en rust in uw leven"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Heeft u moeite met het houden van overzicht over uw financiën of kampt u met oplopende schulden? Of u nu tijdelijk, semi-permanent of blijvend niet meer in staat bent om uw geldzaken zelfstandig te beheren: LUCIAN biedt professionele ondersteuning."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Door mijn ervaring met het creëren van financieel overzicht, breng ik rust en structuur in uw financiële huishouding. Dit vormt een stevige basis om verdere achterstanden te voorkomen en bestaande problemen effectief aan te pakken."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wat houdt budgetbeheer in en hoe werkt het?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Budgetbeheer door LUCIAN is gericht op volledige ontzorging en het creëren van financiële veiligheid door middel van een zorgvuldig ingerichte constructie. Zo ziet het proces eruit:"
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Gestructureerd beheer"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Uw inkomsten worden beheerd via een specifieke constructie die volledig is afgestemd op cliënten die gebruikmaken van financiële hulp. Dit garandeert dat uw gelden strikt gescheiden worden en blijven van overige bedrijfsmiddelen."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Betaling vaste lasten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik draag zorg voor de tijdige betaling van uw vaste lasten, zoals huur, energie, water en verzekeringen, conform een gezamenlijk opgesteld budgetplan."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wekelijks leefgeld"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Om uw dagelijkse uitgaven beheersbaar te houden, ontvangt u wekelijks een afgesproken bedrag aan leefgeld voor zaken als boodschappen en brandstof."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Hoe vraagt u budgetbeheer aan?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "U kunt budgetbeheer op verschillende manieren starten:"
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Op eigen initiatief"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "U neemt direct contact met mij op voor een kennismaking. Dit is de snelste route naar een persoonlijk plan op maat. U hoeft niet te wachten op een crisissituatie; veel van mijn cliënten kiezen juist preventief voor de rust en stabiliteit van professioneel beheer."
						}]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Via advies van instanties"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wordt u door de gemeente, een maatschappelijk werker of een andere hulpverlener geadviseerd om budgetbeheer te zoeken? U heeft vaak de vrijheid om zelf een onafhankelijke partij zoals LUCIAN voor te dragen. Ik kijk graag samen met u naar de mogelijkheden."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Kosten en vergoeding (mogelijk bijzondere bijstand?)"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "In principe bent u zelf verantwoordelijk voor de kosten van budgetbeheer. Wanneer u echter niet over voldoende financiële draagkracht beschikt, kunt u in veel gemeenten aanspraak maken op bijzondere bijstand om de kosten te dekken. Ik ondersteun u graag bij het verkennen van de mogelijkheden."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Budgetbeheer; de juiste keuze voor u?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "De belangrijkste afweging is of de kosten opwegen tegen de baten. In de praktijk levert professioneel budgetbeheer niet alleen een directe besparing op door overbesteding tegen te gaan en extra kosten te voorkomen, maar zorgt het bovenal voor mentale rust en een schuldenvrije toekomst."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ga het gesprek aan; ik nodig u graag uit voor een persoonlijk 1-op-1 gesprek. Samen kijken we naar uw situatie, de specifieke beheerconstructie en hoe we uw financiële balans kunnen herstellen."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 116,
			"path": "/financiele-hulp/financiele-planning.html",
			"title": "Financiële planning: (her)pak de controle | LUCIAN",
			"description": "Geeft u richting aan uw geld, of andersom? Neem de controle en werk toe naar financiële rust en stabiliteit. Plan direct een gratis 1-op-1 gesprek!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.3,
						"strong": true,
						"c": [
							{
								"t": "text",
								"v": "Financiële planning: "
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": " (her)pak de controle over uw financiële toekomst"
							}
						]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Geeft u richting aan uw financiën of geven uw financiën richting aan u? Wanneer u behoefte heeft aan financiële stabiliteit is dat de meest bepalende vraag die u zichzelf zou moeten stellen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Over het algemeen zijn het de financiën die bepalen in welke richting we ons bewegen. We zijn kortom over het algemeen reactief met geldzaken bezig daar waar er meer proactief mee omgegaan zou moeten worden. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "De stappen naar een proactieve financiële toekomst"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Doelen stellen"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Hoe werkt u nou toe naar een meer proactieve benadering van uw financiën! Om te beginnen is het belangrijk doelen te formuleren, antwoord te geven op de vraag waar u met uw financiën wilt staan over pakweg 20 jaar, maar ook over 10 jaar en over 5 jaar. Wilt u specifieke doelen realiseren zoals bijvoorbeeld genieten van een heerlijke (maar kostbare) cruise of het aankopen van een vakantiewoning in Hongarije?, of streeft u naar financiële onafhankelijkheid, en hoe ziet u deze financiële onafhankelijkheid dan voor zich in praktische termen? Het begint kortom allemaal met het bepalen en formuleren van doelen. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Plannen"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Na het formuleren van de doelen en het uitvoeren van de benodigde haalbaarheidscalculaties -want de doelen moeten natuurlijk wel gerealiseerd kunnen worden met het beschikbare budget- is het tijd om te gaan plannen. De geformuleerde doelen zullen over het algemeen gerealiseerd moeten gaan worden op middellange-en lange termijn, dus zullen er periodiek voorzieningen gevormd moeten worden. Verder zal vastgelegd en gepland moeten worden welke voorzieningen, wanneer en voor welk doel gevormd moeten worden. Kortom plannen is niet iets wat je er even bij doet maar een wezenlijk onderdeel van financiële 'planning'. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Controleren voortgang"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Eenmaal op weg is het natuurlijk de bedoeling de juiste koers aan te houden en conform planning te blijven handelen. Daarom worden periodieke controle-momenten ingebouwd waarbij nagegaan wordt of de voorzieningen die gevormd hadden moeten worden ook daadwerkelijk gevormd zijn. Daarnaast zal periodiek besproken moeten worden of de in het verleden geformuleerde doelen op dat moment nog steeds de doelen zijn waarnaar gestreefd wordt, want voortschrijdend inzicht kan immers leiden tot aanpassingen in de doelstellingen. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Bijsturen"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "De uitkomsten van de periodieke controle kunnen ertoe leiden dat er bijgestuurd moet worden. Er zijn ontelbare redenen die tot bijsturing kunnen leiden, zo kun je bijvoorbeeld je baan verliezen en daardoor minder budget beschikbaar hebben of ongepland een kindje verwachten en daardoor andere prioriteiten gaan stellen. Wat de reden ook is, bijsturing behoort altijd tot de mogelijkheden want niets staat immers in steen gehouwen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " En met het bijsturen is het 'cirkeltje rond'. Na het bijsturen begint een nieuwe cyclus van doelen stellen, plannen, controleren op voortgang en eventueel bijsturen. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Financiële rust is er voor iedereen"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Financiële planning is er trouwens niet uitsluitend voor de rijk gevulde portemonnee! U bent bij LUCIAN ook aan het juiste adres wanneer u beschikt over een minder goed gevulde buidel en toe wilt werken naar meer rust en stabiliteit in uw financiën. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Vrijblijvend kennis maken?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Geïnteresseerd, maar nog niet volledig overtuigd! Ik wil u uitnodigen een 1-op-1 gesprek met mij aan te gaan, waarin ik antwoord kan geven op al uw vragen en eventuele twijfels kan wegnemen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Ik hoor graag van u. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Met vriendelijke groet, "
							},
							{ "t": "br" },
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Andries Luchies"
								}]
							}
						]
					}
				]
			}]
		},
		{
			"id": 690,
			"path": "/administratiekantoor-winschoten.html",
			"title": "Administratiekantoor Winschoten | LUCIAN",
			"description": "Zoekt u een administratiekantoor in Winschoten? LUCIAN biedt nuchtere ondersteuning en fiscale rust voor ZZP en MKB. U de focus op uw bedrijf, ik op de rest!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Administratiekantoor Winschoten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Uw administratie nuchter georganiseerd"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Heeft u als ondernemer in Winschoten of omstreken het gevoel dat de administratie meer tijd opslokt dan waar het eigenlijk over zou moeten gaan binnen uw bedrijf? Ik geloof erin dat cijfers voor u moeten werken, niet andersom. LUCIAN is het administratiekantoor in Winschoten dat staat voor een nuchtere aanpak en volledige ontzorging. Zo kunt u zich focussen op wat u het liefste doet: ondernemen."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom kiezen voor een administratiekantoor uit Winschoten?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het bijhouden van een foutloze boekhouding is vakwerk. Zeker in de regio Oost-Groningen zoeken ondernemers een partner die de taal spreekt, de lokale markt begrijpt en niet houdt van onnodige poespas. Als uw lokale administratiekantoor in Winschoten bied ik precies dat."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Of u nu een startende zzp’er bent, een groeiende mkb’er of een gevestigde vof; een goede administratie is het fundament van uw succes. Het geeft u niet alleen rust bij de Belastingdienst, maar ook het broodnodige inzicht in uw winstmarges, cashflow en fiscale (on)mogelijkheden."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom kiezen voor LUCIAN?"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Nuchtere Groningse mentaliteit"
								}]
							}, {
								"t": "text",
								"v": ": geen dure praatjes, maar heldere taal en eerlijke adviezen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Maximale ontzorging"
								}]
							}, {
								"t": "text",
								"v": ": van bonnetjes tot jaarrekening; ik neem het u uit handen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Persoonlijk contact"
								}]
							}, {
								"t": "text",
								"v": ": geen nummer in een systeem, maar een vast aanspreekpunt in de regio."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Fiscaal voordeel"
								}]
							}, {
								"t": "text",
								"v": ": ik ken de aftrekposten en regelingen waar u recht op heeft."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Mijn diensten: van boekhouding tot fiscaal advies"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bij mijn administratiekantoor in Winschoten kunt u terecht voor een breed scala aan diensten. Ik pas mijn dienstverlening aan op uw behoeften. Wilt u zelf factureren en mij de controle laten doen? Of wilt u de volledige administratie uitbesteden? Alles is mogelijk."
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Financiële administratie"
								}]
							}, {
								"t": "text",
								"v": ": het hart van uw bedrijf. Ik verwerk uw inkoop- en verkoopfacturen, bankafschriften en declaraties op een overzichtelijke manier. Dankzij moderne software heeft u altijd een up-to-date beeld van uw financiële situatie."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Belastingaangiften (BTW, IB en VPB)"
								}]
							}, {
								"t": "text",
								"v": ": de Belastingdienst stelt strenge eisen aan termijnen en regels. Ik verzorg uw omzetbelasting, inkomstenbelasting en indien nodig de vennootschapsbelasting. Zo voorkomt u boetes en weet u zeker dat u nooit te veel betaalt."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Jaarrekeningen en rapportages"
								}]
							}, {
								"t": "text",
								"v": ": aan het einde van het jaar wilt u weten waar u staat. Ik stel de jaarrekening op die voldoet aan alle wettelijke eisen. Dit is niet alleen belangrijk voor de fiscus, maar ook voor banken of investeerders."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Bedrijfsadvies en ontzorging"
								}]
							}, {
								"t": "text",
								"v": ": heeft u vragen over investeringen, rechtsvormen of groei? Ik fungeer als uw klankbord. Mijn missie is om u te ontzorgen, zodat administratieve lasten geen blok aan uw been worden."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Dé partner voor ondernemers in de regio Winschoten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als u zoekt naar een administratiekantoor in Winschoten, zoekt u waarschijnlijk meer dan alleen iemand die cijfers inklopt. U zoekt een partner die proactief meedenkt. LUCIAN is gevestigd in de regio en kent de dynamiek van de lokale ondernemersgemeenschap."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Of u nu gevestigd bent in het centrum van Winschoten, op het industrieterrein of in omliggende dorpen zoals Heiligerlee, Scheemda of Beerta; ik sta voor u klaar met een luisterend oor en een helder plan."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["em"],
							"c": [{
								"t": "text",
								"v": "\"Een goede boekhouder verdient zichzelf terug. Niet alleen in geld, maar vooral in tijd en gemoedsrust.\""
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Hoe ik werk: helder en efficiënt"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Mijn werkwijze is net zo nuchter als mijn mentaliteit. In drie stappen naar een zorgeloze administratie:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Kennismaking"
								}]
							}, {
								"t": "text",
								"v": ": we bespreken uw bedrijf, uw wensen en waar u tegenaan loopt."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Inrichting"
								}]
							}, {
								"t": "text",
								"v": ": ik kijk hoe we uw administratie zo efficiënt mogelijk kunnen inrichten, vaak met behulp van slimme digitale tools."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Lopende ondersteuning"
								}]
							}, {
								"t": "text",
								"v": ": ik verwerk de gegevens, dien de aangiften in en u ontvangt periodiek de cijfers die er echt toe doen."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Neem contact met mij op"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bent u klaar om de controle over uw cijfers terug te nemen zonder dat het u extra moeite kost? Ontdek wat mijn administratiekantoor in Winschoten voor uw onderneming kan betekenen."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Geen ingewikkelde contracten, maar een samenwerking op basis van vertrouwen en vakmanschap. Neem vandaag nog contact met mij op voor een vrijblijvende offerte of een kennismakingsgesprek."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Veelgestelde vragen over mijn aanbod"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Wat kost dat?"
								}]
							}, {
								"t": "text",
								"v": ": de kosten zijn afhankelijk van de grootte van uw administratie en de diensten die u afneemt. Ik werk met transparante tarieven zodat u nooit voor verrassingen komt te staan."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Kan ik mijn huidige boekhouding makkelijk overzetten?"
								}]
							}, {
								"t": "text",
								"v": ": zeker. Ik help u bij de overstap van uw huidige boekhouder of systeem naar mijn werkwijze, zodat er geen data verloren gaat en de continuïteit gewaarborgd blijft."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Werken jullie (ook) volledig digitaal?"
								}]
							}, {
								"t": "text",
								"v": ": ja, ik maak gebruik van moderne software waarmee u eenvoudig documenten kunt aanleveren via een app of e-mail. Dit bespaart u tijd en voorkomt een hoop papieren rompslomp."
							}]
						]
					}
				]
			}]
		},
		{
			"id": 692,
			"path": "/belastingadviseur-winschoten.html",
			"title": "Belastingadviseur Winschoten | LUCIAN",
			"description": "Dé belastingadviseur in de regio Winschoten voor ondernemers en ZZP'ers. Van aangiftes tot fiscale planning: LUCIAN ontzorgt u volledig. Maak nu een afspraak!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Belastingadviseur Winschoten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Slim en nuchter fiscaal advies"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Zoekt u een belastingadviseur in Winschoten die niet in ingewikkelde vaktermen spreekt, maar u simpelweg vertelt waar u aan toe bent? Ik combineer diepgaande fiscale kennis met een nuchtere Groningse aanpak. Ik zorg ervoor dat u fiscaal optimaal bent ingericht, zodat u nooit een euro te veel betaalt en altijd voldoet aan actuele wetgeving."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Fiscale kansen benutten en risico’s uitsluiten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "De belastingwetgeving in Nederland verandert doorlopend. Voor veel ondernemers en particulieren in de regio Winschoten zal dit aanvoelen als een doolhof. Als uw deskundige belastingadviseur in Winschoten is het mijn taak om dat doolhof voor u overzichtelijk te maken."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Of het nu gaat om de inkomstenbelasting, vennootschapsbelasting of complexe vraagstukken rondom bedrijfsoverdracht en investeringen; ik kijk verder dan alleen de actuele cijfers. Ik kijk naar uw toekomst."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom kiezen voor LUCIAN als uw belastingadviseur?"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Geen verrassingen achteraf"
								}]
							}, {
								"t": "text",
								"v": ": ik ben helder over mijn tarieven en werkwijze."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Ontzorging van A tot Z"
								}]
							}, {
								"t": "text",
								"v": ": ik regel de correspondentie met de Belastingdienst, zodat u dat niet hoeft te doen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Proactief advies"
								}]
							}, {
								"t": "text",
								"v": ": ik klop bij u aan als er een fiscale regeling wijzigt die gunstig voor u kan uitpakken."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Lokale betrokkenheid"
								}]
							}, {
								"t": "text",
								"v": ": ik ken de ondernemersgeest in Winschoten en omstreken als geen ander."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Mijn fiscale diensten in Winschoten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Een goede belastingadviseur is een investering die zichzelf terugverdient. LUCIAN biedt een breed pakket aan fiscale diensten aan, altijd met de focus op ontzorgen."
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Fiscaal advies voor ondernemers"
								}]
							}, {
								"t": "text",
								"v": ": bent u een zzp'er, onderneemt u vanuit een vof of leidt u een bv? Elke rechtsvorm heeft zijn eigen fiscale spelregels. Ik adviseer u over de meest gunstige structuur, investeringsaftrek (zoals de KIA, MIA of Vamil) etc."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Complexe belastingaangiften"
								}]
							}, {
								"t": "text",
								"v": ": het invullen van een aangifte is één ding, het optimaal benutten van aftrekposten is een tweede. Ik verzorg uw aangiften nauwkeurig en conform de laatste eisen, waardoor de kans op controles of naheffingen geminimaliseerd wordt."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Financiële planning en vermogensbeheer"
								}]
							}, {
								"t": "text",
								"v": ": hoe staat u er over vijf of tien jaar voor? Ik help u bij het plannen van uw financiële toekomst. Of het nu gaat om pensioenopbouw, schenkingen aan kinderen of de verkoop van uw onderneming in de regio Winschoten."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Hulp bij controles en bezwaarschriften"
								}]
							}, {
								"t": "text",
								"v": ": heeft u een geschil met de Belastingdienst? Als uw belastingadviseur in Winschoten treed ik op als uw vertegenwoordiger. Ik spreek de taal van de fiscus en sta stevig in mijn schoenen om uw belangen te behartigen."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Nuchter advies zonder poespas"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "In Winschoten houden we van aanpakken, eerlijkheid en nuchterheid. Dat is precies hoe ik werk. Geen dikke rapporten die in de lade verdwijnen, maar praktisch advies waar u direct iets aan heeft. Ik maak complexe belastingzaken begrijpelijk."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik ontzorg u door de deadline-bewaking over te nemen en ervoor te zorgen dat uw fiscale zaken simpelweg 'op de rit' staan en blijven. Dat geeft rust in de kop en ruimte in de portemonnee."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Hoe ik werk: helder en efficiënt"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Een goede klik met uw belastingadviseur is essentieel. Daarom werk ik volgens een simpel proces:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Vrijblijvende kennismaking"
								}]
							}, {
								"t": "text",
								"v": ": we bespreken uw huidige situatie en uw doelen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Fiscale scan"
								}]
							}, {
								"t": "text",
								"v": ": ik kijk waar de kansen en risico's liggen binnen uw huidige administratie en aangiften."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Structurele ontzorging"
								}]
							}, {
								"t": "text",
								"v": ": we maken afspraken over hoe ik u periodiek adviseer en ontlast."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Neem contact op met uw belastingadviseur in Winschoten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wilt u zeker weten dat u fiscaal het maximale resultaat behaalt zonder zelf de wetboeken in te hoeven duiken? Kies voor mijn nuchtere expertise."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Persoonlijk contact vind ik belangrijk. Daarom kom ik voor een kennismaking of overleg graag naar u toe in de regio Winschoten e.o.. Daarnaast kunnen we natuurlijk altijd snel schakelen via een digitale afspraak of telefonisch overleg."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Veelgestelde vragen over mijn aanbod"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Is een belastingadviseur alleen voor grote bedrijven?"
								}]
							}, {
								"t": "text",
								"v": ": absoluut niet. Ook voor ZZP'ers en particulieren met een complexere situatie (zoals een eigen woning, erfenis of beleggingen) kan een belastingadviseur in Winschoten zeer rendabel zijn."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Wat is het verschil tussen een boekhouder en een belastingadviseur?"
								}]
							}, {
								"t": "text",
								"v": ": een boekhouder verwerkt primair het verleden (de bonnetjes en facturen). Een belastingadviseur kijkt proactief naar de toekomst: hoe kunt u de wetgeving gebruiken om nu en later minder belasting te betalen?"
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Kan ik ook bij jullie terecht voor alleen een eenmalig advies?"
								}]
							}, {
								"t": "text",
								"v": ": ha, ik bied zowel doorlopende ondersteuning als advies voor eenmalige trajecten, zoals een herstructurering of een complexe aangifte inkomstenbelasting."
							}]
						]
					}
				]
			}]
		},
		{
			"id": 694,
			"path": "/boekhouder-winschoten.html",
			"title": "Boekhouder Winschoten; uw nuchtere partner in cijfers",
			"description": "Zoekt u een nuchtere boekhouder uit Winschoten? LUCIAN biedt persoonlijke hulp bij uw administratie en belastingaangiften voor ZZP en MKB. Plan een gesprek!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Boekhouder Winschoten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Een nuchtere blik op uw boekhouding"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Zoekt u een betrouwbare boekhouder in Winschoten die uw taal spreekt? Ik geloof dat een goede boekhouder meer is dan iemand die alleen de cijfers verwerkt. Ik ben uw nuchtere partner die zorgt voor overzicht, rust en een foutloze administratie. Ik ontzorg u volledig, zodat u de handen vrij heeft voor uw eigen onderneming."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom een lokale boekhouder uit Winschoten inschakelen?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Focus op uw groei, niet op de bonnetjes. In de regio Winschoten zie ik vaak dat ondernemers hun kostbare avonduren besteden aan hun administratie. Zonde van de energie. Ik neem uw boekhouding volledig uit handen met de bekende Groningse nuchterheid en precisie. Zo houdt u de handen vrij voor uw eigen vakgebied."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Of u nu een zzp'er bent die hulp nodig heeft bij de kwartaalaangifte, of een mkb-ondernemer die een sparringpartner zoekt voor de bedrijfsvoering; ik bied maatwerk dat past bij uw ambitie en budget."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom kiezen voor LUCIAN?"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Persoonlijke aanpak"
								}]
							}, {
								"t": "text",
								"v": ": u bent bij mij geen nummer; ik ken uw verhaal achter de cijfers."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Maximale ontzorging"
								}]
							}, {
								"t": "text",
								"v": ": ik regel de bonnetjes, facturen en belastingaangiften."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Heldere prijsafspraken"
								}]
							}, {
								"t": "text",
								"v": ": zodat u precies weet waar u aan toe bent."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Efficiënt en modern"
								}]
							}, {
								"t": "text",
								"v": ": ik maak gebruik van slimme software om uw boekhouding te optimaliseren."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Diensten van uw boekhouder uit Winschoten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Een goede boekhouding is de basis voor fiscale voordelen en gezonde groei. LUCIAN biedt we een compleet pakket aan diensten aan."
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Volledige verzorging van de boekhouding"
								}]
							}, {
								"t": "text",
								"v": ": ik boek uw facturen in, koppel uw bankmutaties en houdt uw administratie wekelijks of maandelijks bij. Hierdoor heeft u altijd een actueel beeld van uw winst en verlies."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "BTW-aangifte en Belastingen"
								}]
							}, {
								"t": "text",
								"v": ": nooit meer zorgen over de deadlines. Als uw boekhouder in Winschoten zorg ik ervoor dat uw aangifte omzetbelasting tijdig klaarstaat. Ook de jaarlijkse aangifte inkomstenbelasting regel ik tot in de puntjes."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Jaarrekening en Rapportages"
								}]
							}, {
								"t": "text",
								"v": ": aan het einde van het jaar maken we de balans op. Ik stel een heldere jaarrekening op die u kunt gebruiken voor de fiscus, de bank of simpelweg voor uw eigen inzicht in de groei van uw bedrijf."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Hulp bij het starten van een bedrijf"
								}]
							}, {
								"t": "text",
								"v": ": bent u net begonnen als ondernemer in het Oldambt? Ik help u bij het inrichten van een overzichtelijke administratie, zodat u vanaf dag één een vliegende start maakt."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Nuchter en transparant: zo werk ik"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "In Winschoten houden we niet van poespas. Mijn werkwijze als boekhouder is daarom simpel en doeltreffend. Ik kijk naar wat u écht nodig heeft om ontzorgd te worden. Geen dikke adviesrapporten, maar praktische tips waar u direct rendement uit haalt."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik maak de stap naar een professionele boekhouding zo klein mogelijk. U levert de stukken digitaal aan (of ik help u daarbij) en ik doe de rest. Zo simpel kan het zijn."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Uw sparringpartner in de regio Winschoten en omstreken"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als lokale boekhouder in Winschoten ben ik nauw betrokken bij de ondernemers in de regio. Of u nu gevestigd bent in het hart van de stad, in Scheemda, Beerta of Heiligerlee; ik ben altijd in de buurt voor overleg."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik fungeer graag als uw externe 'financiële afdeling'. Ik denk mee over investeringen, fiscale aftrekposten en hoe u meer grip krijgt op uw cashflow."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Klaar voor een zorgeloze administratie?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bent u klaar om uw boekhouding over te dragen aan een deskundige en nuchtere partij? Ontdek waarom steeds meer ondernemers kiezen voor mijn persoonlijke aanpak."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Neem vandaag nog contact op met uw nieuwe boekhouder in Winschoten voor een gratis en vrijblijvend kennismakingsgesprek."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Veelgestelde vragen over mijn aanbod"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Wat is het verschil tussen een boekhouder en een administratiekantoor?"
								}]
							}, {
								"t": "text",
								"v": ": in de praktijk worden de termen vaak door elkaar gebruikt. Bij een boekhouder ligt de nadruk vaak op het persoonlijke contact en de directe ondersteuning bij de dagelijkse cijfers, precies wat ik bied in Winschoten."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Kan ik halverwege het jaar overstappen naar LUCIAN?"
								}]
							}, {
								"t": "text",
								"v": ": ja, dat is geen enkel probleem. Ik zorg voor een soepele overgang en neem uw administratie vanaf het begin van het boekjaar mee in mijn systemen, zodat uw jaaroverzicht sluitend is."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Is een boekhouder in Winschoten duur?"
								}]
							}, {
								"t": "text",
								"v": ": nee, een goede boekhouder verdient zichzelf terug door u tijd te besparen en ervoor te zorgen dat u alle fiscale voordelen optimaal benut. Ik werk met transparante tarieven die passen bij uw bedrijfsgrootte."
							}]
						]
					}
				]
			}]
		},
		{
			"id": 697,
			"path": "/achterstand-boekhouding.html",
			"title": "Achterstand boekhouding wegwerken | LUCIAN",
			"description": "Achterstand boekhouding? LUCIAN in Winschoten helpt ondernemers nuchter en discreet met het creëren van orde uit chaos. Voorkom boetes en krijg uw rust terug.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Achterstand boekhouding wegwerken"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "De nuchtere ontzorger uit Winschoten"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Heeft u door drukte, ziekte of andere omstandigheden een achterstand in uw boekhouding opgelopen? U bent niet de enige. Het opstapelen van administratie zorgt voor onrust en kan leiden tot problemen met de Belastingdienst."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Bij LUCIAN bied ik -zonder te oordelen- de helpende hand. Ik ben de nuchtere expert in Winschoten die uw administratie weer vlot trekt en u volledig ontzorgt."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Geen paniek bij een achterstand in uw administratie"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het kan iedereen overkomen: de focus ligt op het werk, en de administratie schiet erbij in. Voor u het weet, liggen er maanden aan facturen en bankafschriften te wachten. De drempel om er dan nog aan te beginnen wordt steeds hoger."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als uw partner in Winschoten zeg ik: blijf er niet mee zitten. Een achterstand in de boekhouding is vervelend, maar altijd op te lossen. Ik pak de ordners of de digitale mappen aan, sorteer en organiseer de chaos en zorg dat u binnen no-time weer up-to-date bent."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom LUCIAN inschakelen?"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Geen oordeel, maar actie"
								}]
							}, {
								"t": "text",
								"v": ": ik kijk niet naar waarom het is blijven liggen, maar hoe we het oplossen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Snelheid en structuur"
								}]
							}, {
								"t": "text",
								"v": ": ik heb ervaring met het efficiënt inhalen van maanden (of jaren) aan administratie."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Voorkom boetes"
								}]
							}, {
								"t": "text",
								"v": ": ik zorg dat achterstallige aangiften alsnog zo snel mogelijk worden ingediend."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Nuchtere aanpak"
								}]
							}, {
								"t": "text",
								"v": ": heldere communicatie en een aanpak die rust geeft in uw hoofd."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Mijn aanpak: in 3 stappen naar een schone lei"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wanneer u mij inschakelt om een achterstand in uw boekhouding weg te werken, ga ik direct en systematisch te werk."
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De inventarisatie"
								}]
							}, {
								"t": "text",
								"v": ": we verzamelen samen, waarbij de meeste inbreng natuurlijk van u zal moeten komen, alle aanwezige documentatie. Wat is er al gedaan en wat ontbreekt er nog? Zo brengen we samen de omvang van de achterstand in kaart."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Het inhaalproces"
								}]
							}, {
								"t": "text",
								"v": ": ik verwerk alle inkoop- en verkoopfacturen, koppel de banktransacties en herstel de aansluiting met eerdere boekjaren. Indien nodig neem ik contact op met de Belastingdienst om uitstel of een regeling te treffen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De toekomstbestendige inrichting"
								}]
							}, {
								"t": "text",
								"v": ": zodra de achterstand is weggewerkt, richt ik uw administratie zo in dat het u in het vervolg nauwelijks tijd kost. Zo voorkomen we samen dat er opnieuw een achterstand ontstaat."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Voorkom problemen met de Belastingdienst"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Een achterstand in de boekhouding betekent vaak ook dat BTW-aangiften of de inkomstenbelasting niet tijdig zijn gedaan. De Belastingdienst kan hiervoor verzuimboetes opleggen of schattingen maken die vaak veel hoger uitvallen dan de werkelijke situatie."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Door LUCIAN in te schakelen, toont u goede wil en worden de juiste cijfers alsnog aangeleverd. Ik fungeer als uw intermediair in Winschoten en omstreken om de schade te beperken en uw fiscale positie te herstellen."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Ontzorging voor ondernemers in de regio Winschoten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Of u nu een zzp'er bent met een tas vol bonnetjes of een mkb-bedrijf met een haperende administratieve flow; ik sta voor u klaar. Mijn focus ligt op ondernemers in Winschoten, het Oldambt en de rest van Groningen."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik bied de creatieve oplossingen die nodig zijn om complexe achterstanden weg te werken. U krijgt weer inzicht in uw winst en verlies, en vooral: u krijgt uw nachtrust terug."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Neem vandaag nog contact op voor een frisse start"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wacht niet tot de volgende herinnering op de mat valt. Een achterstand in de boekhouding lost zichzelf niet op, maar ik kan het wel voor u doen. Nuchter, discreet en professioneel."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Neem contact met mij op voor een kennismakingsgesprek. We kijken samen naar de achterstanden en maken direct een plan van aanpak."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Veelgestelde vragen over achterstanden"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Is mijn administratie te chaotisch voor jou?"
								}]
							}, {
								"t": "text",
								"v": ": zeker niet. Ik heb alles al wel eens gezien. Mijn kracht ligt juist in het aanbrengen van structuur in situaties die voor de ondernemer onoverzichtelijk zijn geworden."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Wat kost het wegwerken van een achterstand?"
								}]
							}, {
								"t": "text",
								"v": ": dat hangt af van de omvang en de complexiteit. Tijdens de inventarisatie geef ik u een eerlijke inschatting of een vast tarief, zodat u precies weet waar u aan toe bent."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Hoe snel kan mijn boekhouding weer bijgewerkt zijn?"
								}]
							}, {
								"t": "text",
								"v": ": afhankelijk van de beschikbaarheid van de gegevens kan ik vaak op zeer korte termijn grote slagen maken. Snelheid is bij achterstanden essentieel om verdere sancties te voorkomen."
							}]
						]
					}
				]
			}]
		},
		{
			"id": 700,
			"path": "/boekhouding-opzetten.html",
			"title": "Boekhouding opzetten: nuchtere hulp voor starters | LUCIAN",
			"description": "Voorkom stress door een rommelige administratie. Ik help je bij het opzetten van je boekhouding, btw-instellingen en software. Zo kun jij blijven ondernemen.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Je boekhouding opzetten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Nuchtere aanpak, direct resultaat"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het starten van een onderneming brengt een hoop energie met zich mee. Je hebt plannen, klanten en ambities. Maar bij die ambities hoort ook een stevig fundament: de administratie. Voor veel ondernemers voelt het opzetten van de boekhouding als een noodzakelijk kwaad of een ingewikkelde puzzel."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik kijk daar anders naar. Ik geloof dat een goede administratie je geen hoofdpijn moet bezorgen, maar juist rust moet geven. Ik help je bij het inrichten van een systeem dat voor jóú werkt, zodat jij je kunt focussen op wat er echt toe doet: ondernemen."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom een goede start van je administratie essentieel is?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Een ongeorganiseerde start van de boekhouding kan later voor vervelende verrassingen zorgen. Denk aan naheffingen van de Belastingdienst, onduidelijkheid over je cashflow of simpelweg urenlang uitzoekwerk in het weekend. Door direct bij de start je boekhouding goed neer te zetten, leg je de basis voor gezonde groei."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "De voordelen van een professionele inrichting"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Direct inzicht"
								}]
							}, {
								"t": "text",
								"v": ": je weet op elk moment hoe je bedrijf er financieel voor staat."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Fiscale voordelen"
								}]
							}, {
								"t": "text",
								"v": ": je mist geen aftrekposten waar je als (startende) ondernemer (mogelijk) recht op hebt."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Tijdbesparing"
								}]
							}, {
								"t": "text",
								"v": ": een slim ingericht systeem automatiseert repeterende taken."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Rust"
								}]
							}, {
								"t": "text",
								"v": ": geen stress meer wanneer de kwartaalaangifte voor de deur staat."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Een boekhouding opzetten: hoe pak ik dat aan?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ik hou niet van ingewikkelde termen of dikke rapporten. Mijn werkwijze is nuchter en doeltreffend. Wanneer ik samen met jou de administratie ga inrichten, doorlopen we de volgende stappen:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "1.Keuze van de juiste software"
								}]
							}, {
								"t": "text",
								"v": ": niet elk pakket past bij elke ondernemer. Ik adviseer je over software die aansluit bij jouw branche en ambities. Of het nu gaat om een eenvoudig online pakket of een uitgebreider systeem, ik zorg ervoor dat de basis staat."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "2.Inrichten van het grootboekrekeningschema"
								}]
							}, {
								"t": "text",
								"v": ": een goed grootboek is de ruggengraat van je cijfers. Ik richt dit zo in dat je direct ziet waar je kosten zitten en waar je omzet vandaan komt, zonder dat je een expert hoeft te zijn om de balans te begrijpen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "3.Koppelingen met de bank"
								}]
							}, {
								"t": "text",
								"v": ": handmatig bankafschriften inkloppen is verleden tijd. Ik koppel de zakelijke rekening(en) direct aan je boekhouding. Hierdoor worden transacties automatisch ingeladen en grotendeels verwerkt. Dat noem ik pas echt ontzorgen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "4.Btw-instellingen en fiscale regels:"
								}]
							}, {
								"t": "text",
								"v": ": ben je btw-plichtig? Pas je de kleineondernemersregeling (KOR) toe? Ik zorg dat alle instellingen correct staan, zodat de aangiftes met één druk op de knop klaarstaan."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "De nuchtere visie van LUCIAN"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "In de wereld van cijfers wordt vaak ingewikkeld gedaan. Ik doe dat liever niet. Mijn aanpak kenmerkt zich door:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Geen poespas"
								}]
							}, {
								"t": "text",
								"v": ": we vertellen je eerlijk wat je nodig hebt en laat weg wat overbodig is."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Duidelijke taal"
								}]
							}, {
								"t": "text",
								"v": ": geen jargon, maar uitleg waar je wat aan hebt."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Bereikbaarheid"
								}]
							}, {
								"t": "text",
								"v": ": heb je een vraag over een factuur of een investering? Even bellen of appen en het is geregeld."
							}]
						]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["em"],
							"c": [{
								"t": "text",
								"v": "\"Boekhouden is mijn vak, voor jou een tool om te groeien. Ik zorg dat die tool optimaal is afgesteld.\""
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Volledig ontzorgd: van opzet naar beheer"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het opzetten van de boekhouding is stap één. Maar wat daarna? LUCIAN is voor de lange termijn. Je kunt ervoor kiezen om na de inrichting zelf de touwtjes in handen te houden met mijn controle op de achtergrond, of je laat de volledige administratie aan mij over."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarmee ik je kan ontzorgen?"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De periodieke btw-aangiftes;"
								}]
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De jaarrekening en de inkomstenbelasting;"
								}]
							}],
							[{
								"t": "text",
								"v": "Salarisadministratie (indien van toepassing);"
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Proactief fiscaal advies."
								}]
							}]
						]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Door je administratie aan LUCIAN uit te besteden, koop je tijd terug. Tijd die je kunt besteden aan je klanten, je gezin of je hobby’s. LUCIAN bewaakt de cijfers, jij bepaalt je koers."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Klaar om je boekhouding professioneel op te zetten?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wil jij een vliegende start maken met je onderneming zonder de administratieve rompslomp? Laten we dan om tafel gaan. Bij LUCIAN combineer ik jarenlange ervaring en expertise met een nuchtere, Noord-Nederlandse mentaliteit."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Neem vandaag nog contact met mij op voor een vrijblijvend kennismakingsgesprek. We kijken samen naar jouw situatie en zorgen dat je boekhouding binnen no-time staat als een huis."
						}]
					}
				]
			}]
		},
		{
			"id": 703,
			"path": "/boekhouding-uitbesteden.html",
			"title": "Boekhouding uitbesteden? Krijg je focus en rust weer terug",
			"description": "Klaar met de administratieve rompslomp? Laat LUCIAN je boekhouding doen. Van btw-aangifte tot jaarrekening: nuchter, modern en zonder poespas. Neem contact op!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Boekhouding uitbesteden"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Krijg je focus en rust weer terug"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Loopt de administratie je wekelijks voor de voeten? Ben je de zondagavonden kwijt aan het inboeken van facturen, of vrees je elk kwartaal de btw-aangifte? Dan is het tijd om te doen waar je écht goed in bent: ondernemen. Je boekhouding uitbesteden aan LUCIAN betekent dat je het cijferwerk overlaat aan een specialist, terwijl jij de volledige controle behoudt."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Geen onnodig ingewikkelde constructies, maar een nuchtere aanpak die rust brengt in je bedrijfsvoering."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Waarom ondernemers hun boekhouding uitbesteden?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Veel ondernemers starten met het idee dat ze de administratie 'er wel even bij doen'. Naarmate je bedrijf groeit, wordt de boekhouding complexer en tijdrovender. Het uitbesteden van je administratie is dan geen kostenpost, maar een investering in groei en kwaliteit."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "De voordelen op een rij:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Fiscale optimalisatie"
								}]
							}, {
								"t": "text",
								"v": ": ik ben op de hoogte van de wet-en regelgeving en zorg ervoor dat je geen belastingvoordeel laat liggen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Foutloze aangiftes"
								}]
							}, {
								"t": "text",
								"v": ": voorkom boetes en naheffingen door een correcte en tijdige verwerking."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Actueel inzicht"
								}]
							}, {
								"t": "text",
								"v": ": je hoeft niet te wachten tot het einde van het jaar; je weet maandelijks precies hoe je ervoor staat."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Focus op kernactiviteiten"
								}]
							}, {
								"t": "text",
								"v": ": besteed je kostbare tijd aan je klanten en projecten in plaats van aan bonnetjes."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Jouw administratie in vertrouwde handen"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Helder moet zijn dat de boekhouding de hartslag van je onderneming vormt. Daarom werk ik op basis van vertrouwen en korte lijnen. Als ik je boekhouding overneem, doe ik dat op een manier die bij jou past."
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Volledige ontzorging"
								}]
							}, {
								"t": "text",
								"v": ": van de dagelijkse verwerking van facturen tot de complexe jaarrekening; ik kan het volledige traject verzorgen. Jij levert de documenten digitaal aan, ik doe de rest."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Grip op je cijfers"
								}]
							}, {
								"t": "text",
								"v": ": uitbesteden betekent bij LUCIAN niet dat je het overzicht verliest. Integendeel. Door gebruik te maken van moderne, online boekhoudsystemen heb je 24/7 inzicht in je resultaten, terwijl ik op de achtergrond ervoor zorg dat alles klopt."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Nuchter advies"
								}]
							}, {
								"t": "text",
								"v": ": LUCIAN is meer dan alleen een verwerkingsfabriek van cijfers. Ik kijk actief mee. Zie ik mogelijkheden om kosten te besparen of verbeteringen in fiscale zin? Dan hoor je dat direct van mij. Gewoon in begrijpelijke taal, zonder poespas."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wat kost het uitbesteden van de boekhouding?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "In de regio staat LUCIAN bekend om zijn persoonlijke benadering. LUCIAN is geen anoniem kantoor, maar een sparringpartner die naast je staat. Wanneer je besluit je boekhouding uit te besteden, kies je voor:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Continuïteit"
								}]
							}, {
								"t": "text",
								"v": ": geen zorgen bij ziekte of vakantie; je boekhouding loopt gewoon door."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Deskundigheid"
								}]
							}, {
								"t": "text",
								"v": ": ik ben altijd op de hoogte van de nieuwste fiscale wet-en regelgeving."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Toegankelijkheid"
								}]
							}, {
								"t": "text",
								"v": ": een vraag? Je kunt mij altijd even bellen, mailen of appen. Geen wachtrijen, maar direct contact."
							}]
						]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["em"],
							"c": [{
								"t": "text",
								"v": "\"Je administratie uitbesteden is geen teken van controle verliezen, het is een teken van professioneel management\""
							}]
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "De route naar een zorgeloze administratie"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ben je klaar met de administratieve rompslomp? Wil je ondernemen met de wetenschap dat je cijfers in vertrouwde handen zijn? De stappen die je af moet leggen zijn simpel en overzichtelijk:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Kennismaking"
								}]
							}, {
								"t": "text",
								"v": ": we bespreken je huidige werkwijze en waar de knelpunten liggen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Plan van aanpak"
								}]
							}, {
								"t": "text",
								"v": ": we stellen vast welke delen van de boekhouding je wilt uitbesteden."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Inrichting"
								}]
							}, {
								"t": "text",
								"v": ": we koppelen systemen en spreken af hoe we informatie uitwisselen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Ontzorging"
								}]
							}, {
								"t": "text",
								"v": ": ik ga aan de slag, jij krijgt je tijd terug."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Neem contact op voor een nuchter gesprek over jouw boekhouding"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Benieuwd wat het uitbesteden van je boekhouding voor jouw onderneming kan betekenen? Laten we kennismaken. Ik laat je graag zien hoe mijn nuchtere aanpak jou kan helpen om efficiënter en relaxter te ondernemen."
						}]
					}
				]
			}]
		},
		{
			"id": 705,
			"path": "/debiteurenbeheer-uitbesteden.html",
			"title": "Debiteurenbeheer uitbesteden? de nuchtere aanpak van LUCIAN",
			"description": "Uw debiteurenbeheer uitbesteden aan een specialist? LUCIAN pakt het nuchter en consequent aan. Verbeter uw DSO en focus weer op uw business. Neem contact op!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.3,
						"strong": true,
						"c": [
							{
								"t": "text",
								"v": "Debiteurenbeheer uitbesteden: "
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": "Uw facturen betaald, uw klantrelatie gezond"
							}
						]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Niets is vervelender dan hard werken voor je geld, om vervolgens eindeloos te moeten wachten op betaling. Openstaande posten drukken niet alleen uw liquiditeit, maar kosten ook bakken met energie. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Wilt u uw debiteurenbeheer uitbesteden? LUCIAN pakt dit nuchter aan. Ik zorg ervoor dat uw facturen worden betaald, zonder dat de relatie met uw klant onder druk komt te staan. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Waarom uw debiteurenbeheer uitbesteden een slimme zet is"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Veel ondernemers vinden het lastig om klanten aan te spreken op openstaande facturen. Men is bang om te streng over te komen of de gunfactor te verliezen. Door uw debiteurenbeheer uit te besteden aan een externe specialist zoals LUCIAN, creëert u een gezonde afstand. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "De voordelen van professioneel credit management:"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Snellere betalingen:"
								}]
							},
							{
								"t": "text",
								"v": " Strak en consequent debiteurenbeheer verkort de Days Sales Outstanding (DSO) aanzienlijk. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Betere cashflow:"
								}]
							},
							{
								"t": "text",
								"v": " Er staat minder kapitaal vast, waardoor u kunt blijven investeren in uw eigen groei. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Behoud van klantrelaties:"
								}]
							},
							{
								"t": "text",
								"v": " Ik treed op als professionele tussenpersoon, waardoor u de 'good guy' blijft. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Rust op de werkvloer:"
								}]
							},
							{
								"t": "text",
								"v": " Geen frustraties meer over herinneringen sturen; LUCIAN regelt het proces van A tot Z."
							}
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "De nuchtere werkwijze van LUCIAN"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Bij het uitbesteden van debiteurenbeheer draait alles om balans. U wilt uw geld, maar u wilt ook dat uw klant de volgende keer weer bij u aanklopt en niet bij uw concurrent. Mijn aanpak is gebaseerd op heldere communicatie en Groningse nuchterheid. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Consequent en duidelijk"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Ik geloof niet in agressieve methodes; wel in duidelijkheid. Door op de juiste momenten een vriendelijke herinnering of een zakelijke aanmaning te sturen, weten uw debiteuren precies waar ze aan toe zijn. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Maatwerk in benadering"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Niet elke klant is hetzelfde. Ik kijk naar de historie en het profiel van uw debiteuren. Waar nodig bel ik even na om te horen of de factuur in goede orde is ontvangen. Vaak lost een nuchter gesprek meer op dan drie formele brieven. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Volledige ontzorging"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Vanaf het moment dat de factuur is verstuurd tot het moment dat het bedrag op uw rekening staat: ik monitor het proces. U heeft er geen omkijken naar, maar blijft via mijn rapportages wel volledig op de hoogte."
						}]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Credit management zonder poespas"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Ik houd de lijnen kort. Als u besluit uw debiteurenbeheer uit te besteden, krijgt u een vaste contactpersoon die uw dossier door en door kent. Geen callcenters of wisselende medewerkers, maar een deskundige partner die begrijpt hoe uw business werkt. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Mijn focus ligt op ontzorgen. Ik neem het ongemakkelijke deel van het ondernemerschap van u over, zodat u zich kunt richten op nieuwe opdrachten en projecten. Ik bewaak de achterdeur, zodat u de voordeur wagenwijd open kunt houden voor nieuwe business. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Wat levert het uitbesteden u op?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Naast een betere liquiditeit levert een gestructureerd debiteurenbeheer u vooral tijd op. Tijd die u waarschijnlijk liever besteedt aan uw vak dan aan het controleren van bankafschriften en het versturen van herinneringen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Wanneer ik uw debiteurenbeheer overneem, merkt u vaak al binnen één kwartaal resultaat. Facturen worden sneller voldaan en het aantal 'dubieuze debiteuren' neemt af. Dat is de kracht van een nuchtere, consequente aanpak. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Klaar voor een gezonde cashflow?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Wilt u weten hoe ik uw debiteurenbeheer kan optimaliseren? Of u nu een paar facturen per maand verstuurt of een omvangrijke administratie heeft: ik bied een oplossing die past bij uw onderneming. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Neem direct contact op voor een vrijblijvend gesprek. We kijken samen hoe we uw debiteurenbeheer nuchter en effectief kunnen inrichten, zodat u weer zorgeloos kunt ondernemen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Met vriendelijke groet, "
							},
							{ "t": "br" },
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Andries Luchies"
								}]
							}
						]
					}
				]
			}]
		},
		{
			"id": 707,
			"path": "/fiscaal-advies-ondernemers.html",
			"title": "Fiscaal advies voor ondernemers: betaal nooit te veel",
			"description": "Uw fiscaliteiten perfect op orde? Ontvang fiscaal advies voor ondernemers met een nuchtere kijk. Voorkom dat u geld laat liggen en neem direct contact op!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.3,
						"strong": true,
						"c": [
							{
								"t": "text",
								"v": "Fiscaal advies voor ondernemers: "
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": "Nuchtere kijk op uw belastingzaken"
							}
						]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Als ondernemer wilt u doen waar u goed in bent: ondernemen. Maar de fiscale wetgeving in Nederland is complex en verandert voortdurend. Zoekt u fiscaal advies voor ondernemers dat verder gaat dan alleen het invullen van de cijfers? "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " LUCIAN vertaalt ingewikkelde belastingregels naar praktische kansen voor uw bedrijf. Geen hoogdravend jargon, maar eerlijk en helder advies waar u direct iets aan heeft. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Waarom deskundig fiscaal advies het verschil maakt"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Veel ondernemers zien de belastingaangifte als een jaarlijkse verplichting. Maar wie slim naar de cijfers kijkt, ziet mogelijkheden om belasting te besparen en risico’s te verkleinen. Fiscaal advies gaat niet alleen over het verleden, maar vooral over de toekomst van uw onderneming. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Wat goed fiscaal advies u oplevert:"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Optimale benutting van aftrekposten:"
								}]
							},
							{
								"t": "text",
								"v": " Betaal nooit meer belasting dan strikt noodzakelijk. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Toekomstbestendige structuur:"
								}]
							},
							{
								"t": "text",
								"v": " Is een eenmanszaak nog wel de beste keuze, of is een BV fiscaal aantrekkelijker? "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Rust bij controles:"
								}]
							},
							{
								"t": "text",
								"v": " U weet zeker dat uw aangiftes voldoen aan de laatste wet- en regelgeving. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Financiële planning:"
								}]
							},
							{
								"t": "text",
								"v": " Inzicht in uw oudedagsvoorziening, investeringen en fiscale reserves."
							}
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Mijn aanpak: ontzorgen met beide benen op de grond"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Fiscaal advies voor ondernemers hoeft niet ingewikkeld te zijn. Ik geloof in een nuchtere aanpak. Ik zit bij u aan tafel, spreek uw taal en kijk met een frisse blik naar uw situatie. Ik neem u de fiscale rompslomp uit handen, zodat u zich kunt focussen op uw groei. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Fiscale scan van uw onderneming"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Hoe staat uw bedrijf er werkelijk voor? Ik voer een nuchtere scan uit van uw huidige fiscale positie. Ik kijk naar uw rechtsvorm, investeringsaftrek en mogelijke fiscale voordelen die u wellicht over het hoofd ziet. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Begeleiding bij complexe vraagstukken"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Of het nu gaat om een bedrijfsoverdracht, de herstructurering van uw onderneming of advies over de auto van de zaak; ik bied de expertise die u nodig heeft. Ik ben de sparringpartner die naast u staat en proactief adviseert wanneer de wetgeving verandert. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Directe communicatie met de Belastingdienst"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Heeft u een brief ontvangen van de Belastingdienst waar u niet direct raad mee weet? Ik neem het contact voor u over. Ik fungeer als uw verlengstuk en zorg voor een professionele afhandeling van vragen of controles. Dat noem ik pas echt ontzorgen."
						}]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Fiscaal advies voor elke fase van uw ondernemerschap"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Elke fase van uw bedrijf vraagt om een andere fiscale strategie. Daarom pas ik mijn advies aan op uw specifieke situatie. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De Startende Ondernemer:"
								}]
							},
							{
								"t": "text",
								"v": " Welke startersaftrek is van toepassing? Hoe richt u de administratie fiscaal optimaal in? "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De Groeiende Ondernemer:"
								}]
							},
							{
								"t": "text",
								"v": " Is het tijd voor een holdingstructuur? Hoe gaat u om met personeel en loonbelasting? "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De Gevestigde Ondernemer:"
								}]
							},
							{
								"t": "text",
								"v": " Hoe optimaliseert u uw pensioenopbouw? Wat zijn de fiscale gevolgen bij verkoop of staking van de onderneming?"
							}
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Waarom kiezen voor LUCIAN?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "In de wereld van de fiscaliteit zijn er veel kantoren die met moeilijke termen strooien. LUCIAN doet dat bewust niet. Mijn kracht ligt in de combinatie van hoogwaardige kennis en een menselijke, toegankelijke werkwijze. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Nuchter:"
								}]
							},
							{
								"t": "text",
								"v": " Ik zeg waar het op staat en geef eerlijk advies, ook als dat betekent dat een bepaalde investering fiscaal even niet handig is. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Proactief:"
								}]
							},
							{
								"t": "text",
								"v": " Ik wacht niet tot u mij belt. Zie ik een wijziging in de belastingplannen die invloed heeft op uw business? Dan neem ik het initiatief. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Ontzorgend:"
								}]
							},
							{
								"t": "text",
								"v": " Van de inkomstenbelasting en vennootschapsbelasting tot de btw; ik regel het hele traject."
							}
						]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "span",
								"marks": ["em"],
								"c": [{
									"t": "text",
									"v": "\"Fiscaal advies is bij LUCIAN geen eenmalig product, maar een doorlopende samenwerking om het beste uit uw onderneming te halen.\""
								}]
							},
							{
								"t": "text",
								"v": " "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Klaar voor fiscaal advies dat echt wat oplevert?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Zoekt u een belastingadviseur die met u meedenkt zonder de realiteit uit het oog te verliezen? Ik help ondernemers in Groningen en omstreken (en ver daarbuiten) om hun fiscale zaken perfect op orde te krijgen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Voorkom dat u onnodig geld laat liggen en kies voor de zekerheid van een expert. Laten we samen naar uw cijfers kijken en een koers uitzetten die fiscaal het meest gunstig is voor u en uw bedrijf. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Neem vandaag nog contact op voor een vrijblijvend kennismakingsgesprek. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Met vriendelijke groet, "
							},
							{ "t": "br" },
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Andries Luchies"
								}]
							}
						]
					}
				]
			}]
		},
		{
			"id": 709,
			"path": "/hulp-bij-belastingaangifte-winschoten.html",
			"title": "Hulp bij belastingaangifte in Winschoten? Kies voor LUCIAN",
			"description": "Geen stress meer over de blauwe envelop. Voor professionele hulp bij belastingaangifte in Winschoten kiest u voor LUCIAN. Ik regel uw aangifte van A tot Z.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.3,
						"strong": true,
						"c": [
							{
								"t": "text",
								"v": "Hulp bij belastingaangifte in Winschoten: "
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": "Rust en zekerheid"
							}
						]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Ziet u elk jaar weer op tegen de blauwe envelop? Of u nu als ondernemer of als particulier uw zaken goed geregeld wilt hebben, de belastingaangifte blijft voor velen een bron van onrust. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Zoekt u hulp bij belastingaangifte in Winschoten? LUCIAN pakt dit nuchter aan. Geen ingewikkelde praatjes, maar een deskundige blik die zorgt dat u nooit een cent te veel betaalt. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Waarom professionele hulp bij uw aangifte in Winschoten?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "De belastingwetgeving verandert sneller dan de seizoenen in Oost-Groningen. Wat vorig jaar nog een aftrekpost was, kan dit jaar anders zijn. Veel mensen laten onbedoeld geld liggen omdat ze niet op de hoogte zijn van de nieuwste regelingen. Door te kiezen voor lokale expertise, kiest u voor de zekerheid dat alles klopt. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Wat levert het inschakelen van LUCIAN u op:"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Maximaal fiscaal voordeel:"
								}]
							},
							{
								"t": "text",
								"v": " Ik ken de kleine lettertjes en benut alle relevante aftrekposten. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Geen stress over deadlines:"
								}]
							},
							{
								"t": "text",
								"v": " Ik bewaak de termijnen, zodat u nooit te laat bent met uw aangifte. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Nuchtere uitleg:"
								}]
							},
							{
								"t": "text",
								"v": " Ik leg u in begrijpelijke taal uit waarom u geld terugkrijgt of moet betalen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Ontzorging van A tot Z:"
								}]
							},
							{
								"t": "text",
								"v": " U levert de gegevens aan, ik doe de rest."
							}
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Mijn diensten: van inkomstenbelasting tot erfbelasting"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Of het nu gaat om de jaarlijkse aangifte inkomstenbelasting of complexere fiscale vraagstukken, ik sta voor u klaar. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Particuliere belastingaangifte"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Heeft u een eigen woning gekocht, bent u gescheiden of is er sprake van een andere grote wijziging in uw leven? Dit heeft direct invloed op uw fiscale huishouding. Ik zorg dat uw aangifte correct wordt ingediend, inclusief de verdeling tussen fiscaal partners om het resultaat te optimaliseren. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Ondernemers in Winschoten"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Als ZZP’er of MKB-ondernemer in Winschoten wilt u dat uw zakelijke aangifte naadloos aansluit op uw privé-situatie. Ik verzorg niet alleen de aangifte, maar kijk ook naar de oudedagsreserve, investeringsaftrek en andere ondernemersfaciliteiten. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Toeslagen en extra ondersteuning"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Belastingzaken gaan verder dan alleen de aangifte. Heeft u recht op zorgtoeslag, huurtoeslag of kindgebonden budget? Ik kijk met een nuchtere blik mee of uw toeslagen nog aansluiten op uw huidige inkomen."
						}]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Typisch LUCIAN: nuchter en betrokken"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "In Winschoten en omstreken houden we van korte lijnen en eerlijke antwoorden. Dat is precies hoe ik werk. Geen ivoren torens, maar een kantoor waar u zich direct op uw gemak voelt. Wanneer u kiest voor hulp bij belastingaangifte in Winschoten via LUCIAN, kiest u voor een partner die naast u staat. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Ik ontzorg u volledig"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "U hoeft niet zelf door stapels documenten te worstelen om te begrijpen wat de Belastingdienst bedoelt. Ik filter de belangrijke zaken ertussen uit, stel de juiste vragen en zorg voor een vlekkeloze digitale verzending. Het enige wat u hoeft te doen, is de benodigde stukken aanleveren. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Lokale expertise, persoonlijke aandacht"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Omdat ik de regio ken, begrijp ik de taal van de ondernemers en inwoners van Winschoten. Ik ben goed bereikbaar en reageer snel op uw vragen. Geen wachttijden bij een landelijke hulplijn, maar direct contact met uw eigen adviseur. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Hoe werkt het? In 3 stappen uw aangifte geregeld"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Kennismaking & inventarisatie:"
								}]
							},
							{
								"t": "text",
								"v": " We bespreken uw situatie en ik geef u een heldere checklist van de benodigde gegevens. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De Verwerking:"
								}]
							},
							{
								"t": "text",
								"v": " Ik duik in uw cijfers, bereken de meest gunstige verdeling en controleer op alle mogelijke aftrekposten. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Indienen & toelichting:"
								}]
							},
							{
								"t": "text",
								"v": " Voordat ik de aangifte verstuur, neem ik de resultaten kort met u door. Pas na uw akkoord gaat de aangifte naar de Belastingdienst."
							}
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Klaar voor een zorgeloze belastingtijd?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Voorkom onzekerheid en laat uw belastingaangifte verzorgen door een professional. Of u nu in Winschoten woont, of in een van de omliggende dorpen zoals Heiligerlee, Beerta of Scheemda; u bent van harte welkom. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Wacht niet tot de laatste dag, maar zorg dat u nu al uw zaken op orde heeft. Dat geeft rust in uw hoofd en vaak meer geld in uw portemonnee. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Neem direct contact met mij op voor een afspraak of meer informatie over mijn tarieven. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Met vriendelijke groet, "
							},
							{ "t": "br" },
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Andries Luchies"
								}]
							}
						]
					}
				]
			}]
		},
		{
			"id": 711,
			"path": "/hulp-bij-toeslagen-en-administratie.html",
			"title": "Hulp bij Toeslagen en Administratie | Grip op uw Financiën",
			"description": "Hulp nodig bij toeslagen en/of administratie? LUCIAN biedt nuchtere ontzorging voor ondernemers en particulieren. Krijg grip op uw cijfers en voorkom zorgen.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.3,
						"strong": true,
						"c": [
							{
								"t": "text",
								"v": "Hulp bij toeslagen en administratie: "
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": "Grip op uw financiën"
							}
						]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Heeft u het gevoel dat u het overzicht verliest in de wirwar van brieven, facturen en formulieren? Of u nu ondernemer bent of particulier, een goed georganiseerde administratie is de basis voor financiële rust. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Zoekt u hulp bij toeslagen en administratie? LUCIAN pakt dit nuchter aan. Ik breng de structuur terug en zorg dat u krijgt waar u recht op heeft, zonder dat u door ingewikkelde wetgeving hoeft te ploeteren. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Waarom hulp bij administratie en toeslagen geen overbodige luxe is"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Nederlandse regelgeving is complex. Een kleine verandering in uw inkomen of gezinssituatie kan grote gevolgen hebben voor uw toeslagen. Als u dit niet tijdig aanpast, loopt u het risico dat u achteraf grote bedragen moet terugbetalen. Daarnaast zorgt een achterstallige administratie voor onnodige stress en gemiste kansen. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "De voordelen van mijn aanpak:"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Voorkom terugbetalingen:"
								}]
							},
							{
								"t": "text",
								"v": " Ik zorg ervoor dat uw gegevens bij de Belastingdienst (Toeslagen) up-to-date zijn. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Overzicht en rust:"
								}]
							},
							{
								"t": "text",
								"v": " Een opgeruimde administratie geeft direct inzicht in uw bestedingsruimte. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Maximale benutting:"
								}]
							},
							{
								"t": "text",
								"v": " Ik controleer of u alle toeslagen ontvangt waar u recht op heeft. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Nuchtere begeleiding:"
								}]
							},
							{
								"t": "text",
								"v": " Geen oordelen over uw huidige administratie, maar een helpende hand om het op orde te krijgen."
							}
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Mijn diensten: volledige ontzorging voor uw papierwerk"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Ik sla de brug tussen uw dagelijkse administratie en de fiscale regels van de Belastingdienst. Mijn hulp is altijd praktisch en direct toepasbaar. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "1. Toeslagen aanvragen en wijzigen"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Heeft u recht op zorgtoeslag, huurtoeslag, kinderopvangtoeslag of het kindgebonden budget? Ik bereken exact op welke bedragen u recht heeft. Wijzigingen in uw leven, zoals een nieuwe baan of een verhuizing, geef ik direct door zodat uw toeslagen altijd in de pas lopen met de realiteit. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "2. Administratieve ondersteuning"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Of het nu gaat om het ordenen van uw zakelijke administratie of het structureren van uw privé-administratie; ik help u bij het opzetten van een systeem dat werkt. Voor ondernemers betekent dit een vloeiende overgang van bonnetjes naar een sluitende boekhouding. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "3. Hulp bij formulieren en brieven"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Ziet u door de bomen het bos niet meer door alle post van officiële instanties? Ik lees met u mee, leg in nuchtere taal uit wat er van u gevraagd wordt en help bij het opstellen van de juiste reactie. "
						}, { "t": "br" }]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Nuchter en betrokken: mijn werkwijze"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Ik geloof niet in ingewikkelde procedures. Ik ben er om u te ontzorgen. Dat doe ik met een mentaliteit die past bij de regio: met beide benen op de grond en eerlijk over de mogelijkheden. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Geen drempels:"
								}]
							},
							{
								"t": "text",
								"v": " U kunt bij LUCIAN terecht met elke administratieve vraag, hoe klein of groot ook. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Duidelijkheid vooraf:"
								}]
							},
							{
								"t": "text",
								"v": " We maken heldere afspraken over de hulpverlening en de kosten, zodat u precies weet waar u aan toe bent. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Privacy en vertrouwen:"
								}]
							},
							{
								"t": "text",
								"v": " Uw gegevens zijn bij mij in veilige handen. Integriteit is de basis van onze samenwerking. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Voor ondernemers én particulieren"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Mijn expertise op het gebied van hulp bij toeslagen en administratie is breed inzetbaar. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Voor ondernemers:"
								}]
							},
							{
								"t": "text",
								"v": " Ik zorg ervoor dat uw zakelijke winst correct wordt vertaald naar uw recht op toeslagen in privé. Dit voorkomt dat u als zelfstandige aan het eind van het jaar voor verrassingen komt te staan bij de definitieve berekening van de Belastingdienst. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Voor particulieren:"
								}]
							},
							{
								"t": "text",
								"v": " Ik help u bij het indienen van de aangifte inkomstenbelasting en koppel dit direct aan uw toeslagen. Zo is de cirkel rond en zijn al uw fiscale zaken in één keer goed geregeld. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Uw administratie weer op de rit?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Wilt u de zekerheid dat uw toeslagen kloppen en uw administratie op orde is? Laat mijn nuchtere blik met u meekijken. Ik neem de last van uw schouders, zodat u weer met een gerust hart naar uw financiën kunt kijken. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Wacht niet tot de brieven van de Belastingdienst zich opstapelen. Neem vandaag nog de stap naar een overzichtelijke administratie. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Neem direct contact op voor een vrijblijvend gesprek."
							}
						]
					}
				]
			}]
		},
		{
			"id": 713,
			"path": "/jaarrekening-zzp.html",
			"title": "Jaarrekening ZZP laten opstellen? Vind rust bij LUCIAN",
			"description": "Wilt u uw jaarrekening laten opstellen als ZZP’er? LUCIAN biedt nuchtere controle, helder inzicht en fiscaal advies. Sluit uw boekjaar zorgeloos af. Neem contact op!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.3,
						"strong": true,
						"c": [
							{
								"t": "text",
								"v": "Jaarrekening ZZP: "
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": "Nuchter overzicht, solide resultaat"
							}
						]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Het einde van het boekjaar is voor veel zelfstandigen een moment van reflectie, maar vaak ook van lichte stress. De administratie moet sluiten en de cijfers moeten officieel worden vastgelegd. Wilt u uw jaarrekening opstellen als ZZP’er zonder dat dit u slapeloze nachten bezorgt? "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " LUCIAN pakt dit nuchter aan. Ik vertaal uw dagelijkse boekhouding naar een helder jaarverslag dat precies laat zien waar u staat. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Is een jaarrekening verplicht voor een ZZP’er?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Hoewel de Belastingdienst voor de meeste eenmanszaken geen officieel gedeponeerde jaarrekening (zoals bij een BV) vereist, is het opstellen van een jaarrekening voor een ZZP’er wel degelijk essentieel. Het vormt namelijk de basis voor uw aangifte inkomstenbelasting en is vaak een harde eis van banken bij een hypotheekaanvraag of bedrijfsfinanciering. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Waarom een professionele jaarrekening loont:"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Financieel kompas:"
								}]
							},
							{
								"t": "text",
								"v": " U ziet in één oogopslag uw winst, verlies en vermogenspositie. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Fiscale onderbouwing:"
								}]
							},
							{
								"t": "text",
								"v": " Een sluitende jaarrekening is uw bewijslast bij een controle van de Belastingdienst. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Zakelijke uitstraling:"
								}]
							},
							{
								"t": "text",
								"v": " Bij externe partijen (zoals kredietverstrekkers) komt u professioneel voor de dag. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Toekomstplanning:"
								}]
							},
							{
								"t": "text",
								"v": " Op basis van de jaarcijfers kunt u nuchtere keuzes maken voor het komende jaren."
							}
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Uw jaarrekening laten opstellen door LUCIAN"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Veel ZZP'ers proberen zelf hun jaarcijfers in elkaar te knutselen. Dat kan, maar het kost vaak veel tijd en het risico op fouten is groot. Ik geloof in ontzorgen. U doet waar u goed in bent, ik zorg dat de cijfers kloppen. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Nuchtere controle van de boekhouding"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Voordat ik de jaarrekening opstel, loop ik uw administratie kritisch na. Staan alle kosten op de juiste plek? Zijn de afschrijvingen correct verwerkt? Ik kijk met een nuchtere blik naar uw uitgaven en inkomsten, zodat we zeker weten dat de basis solide is. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Helder inzicht in uw resultaten"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Een jaarrekening van LUCIAN is geen dik boekwerk met onbegrijpelijke tabellen. Ik hou het overzichtelijk. Ik presenteer de balans en de winst-en-verliesrekening op een manier die u begrijpt. Zo weet u niet alleen wat de cijfers zijn, maar ook waarom ze zo zijn. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Fiscaal advies inclusief"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het opstellen van de jaarrekening is bij mij nooit een statisch proces. Terwijl ik met uw cijfers bezig ben, kijk ik direct of u optimaal gebruikmaakt van ondernemersfaciliteiten zoals de zelfstandigenaftrek of kleinschaligheidsinvesteringsaftrek (KIA). "
						}, { "t": "br" }]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Ontzorgen van balans tot belastingaangifte"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Het mooie van uw jaarrekening laten opstellen door een administratiekantoor als LUCIAN? De stap naar de belastingaangifte is daarna heel klein. Omdat ik de cijfers al tot in de puntjes heb gecontroleerd, kan ik uw aangifte inkomstenbelasting (IB) direct en foutloos verzorgen. Dat is de efficiëntie waar ik van houd. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Mijn werkwijze is simpel en overzichtelijk: "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Aanleveren:"
								}]
							},
							{
								"t": "text",
								"v": " U levert uw administratie digitaal aan. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Verwerken:"
								}]
							},
							{
								"t": "text",
								"v": " Ik controleer de boekingen en maak de fiscale correcties. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Bespreken:"
								}]
							},
							{
								"t": "text",
								"v": " Ik neem de jaarcijfers nuchter met u door. Wat valt op? Waar kan het beter? "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Afronden:"
								}]
							},
							{
								"t": "text",
								"v": " De jaarrekening is klaar en uw aangifte kan de deur uit. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Waarom ZZP’ers kiezen voor LUCIAN"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "In een wereld van dure accountantskantoren kiest LUCIAN voor een andere route. LUCIAN is toegankelijk, spreekt uw taal en begrijpt de uitdagingen van de zelfstandige ondernemer. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Nuchter:"
								}]
							},
							{
								"t": "text",
								"v": " Geen poespas of onnodig ingewikkelde rapportages. Ik vertel u gewoon hoe u ervoor staat. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Betrokken:"
								}]
							},
							{
								"t": "text",
								"v": " LUCIAN is geen anoniem bureau. Ik ken mijn klanten en denk proactief mee over uw bedrijfsvoering. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Vaste tarieven:"
								}]
							},
							{
								"t": "text",
								"v": " Voor het opstellen van een jaarrekening voor ZZP’ers werken we met heldere afspraken. Geen verrassingen achteraf, maar duidelijkheid vooraf. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Uw jaarcijfers nuchter geregeld?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Wilt u dit jaar uw jaarrekening laten opstellen door een professional die u echt begrijpt? Of u nu net bent gestart als ZZP'er of al jarenlang een gevestigde naam bent: LUCIAN helpt u om uw financiële jaar zorgeloos af te sluiten. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Neem vandaag nog de stap naar een overzichtelijke administratie en neem direct contact op voor een vrijblijvend gesprek."
							}
						]
					}
				]
			}]
		},
		{
			"id": 715,
			"path": "/online-boekhouder.html",
			"title": "Online boekhouder: Slim boekhouden met LUCIAN",
			"description": "Zoekt u een online boekhouder die wel gewoon de telefoon opneemt? LUCIAN biedt digitale efficiency met menselijk toezicht. Uw boekhouding veilig in de cloud.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.3,
						"strong": true,
						"c": [
							{
								"t": "text",
								"v": "Online boekhouder: "
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": "Digitale efficiëntie met een nuchtere blik"
							}
						]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Bent u op zoek naar een manier om uw administratie eenvoudiger, sneller en overzichtelijker te maken? Een online boekhouder biedt de oplossing. Bij LUCIAN combineer ik de kracht van moderne software met de nuchtere, persoonlijke begeleiding die u van een lokaal kantoor mag verwachten. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Ik ontzorg u volledig, zodat u altijd en overal inzicht heeft in uw cijfers, zonder dat u er zelf omkijken naar heeft. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Waarom kiezen voor een online boekhouder?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "De tijd van schoenendozen vol bonnetjes en handmatige Excel-lijsten ligt ver achter ons. Als ondernemer wilt u vooruit. U wilt factureren in de trein, bonnetjes scannen met uw telefoon en direct zien hoeveel btw u aan de kant moet zetten. Een online boekhouder maakt dit mogelijk. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 3,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "De voordelen van online samenwerken met LUCIAN:"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Realtime inzicht:"
								}]
							},
							{
								"t": "text",
								"v": " Geen verrassingen achteraf. U ziet direct uw winst, verlies en openstaande posten. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Tijdbesparing:"
								}]
							},
							{
								"t": "text",
								"v": " Door slimme koppelingen met uw bankrekening worden transacties automatisch verwerkt. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Veiligheid:"
								}]
							},
							{
								"t": "text",
								"v": " Uw gegevens staan veilig in de cloud, inclusief automatische back-ups. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Duurzaamheid:"
								}]
							},
							{
								"t": "text",
								"v": " Een papierloze administratie is niet alleen efficiënt, maar ook beter voor het milieu."
							}
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Online gemak, nuchtere ondersteuning"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Hoewel we volledig digitaal kunnen werken, geloof ik niet in een 'anonieme' computer die alles doet. Software is een hulpmiddel, maar een goede boekhouding vraagt om menselijk toezicht. Ik ben de online boekhouder die wel gewoon de telefoon opneemt en nuchter met u meedenkt. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Uw administratie in de cloud"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Ik werk met gebruiksvriendelijke online boekhoudpakketten. Of u nu al een systeem heeft of samen met mij een nieuwe start wilt maken: ik richt het zo in dat het voor ú werkt. Geen ingewikkelde modules die u niet gebruikt, maar een strak systeem dat precies doet wat nodig is. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Factureren en scannen in een handomdraai"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Met mijn online tools stuurt u facturen die direct in uw boekhouding staan. Heeft u een zakelijke lunch gehad of getankt? Maak een foto van de bon met de app en ik verwerk deze direct op de juiste plek. Dat is wat ik noem: maximale ontzorging. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "heading",
						"level": 3,
						"accent": false,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Automatische bankkoppelingen"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Door uw zakelijke rekening te koppelen aan de boekhoudsoftware, worden uw bankafschriften dagelijks ingeladen. Dit voorkomt fouten bij het overtypen en zorgt ervoor dat uw debiteurenbeheer altijd up-to-date is. "
						}, { "t": "br" }]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Voor wie is de online boekhouder van LUCIAN?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Mijn digitale werkwijze is geschikt voor elke ondernemer die van gemak en duidelijkheid houdt. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "ZZP'ers:"
								}]
							},
							{
								"t": "text",
								"v": " Die geen tijd willen verspillen aan administratie en alles via hun smartphone willen regelen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "MKB-ondernemers:"
								}]
							},
							{
								"t": "text",
								"v": " Die behoefte hebben aan een overzichtelijk dashboard om hun bedrijf aan te sturen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Startups:"
								}]
							},
							{
								"t": "text",
								"v": " Die vanaf dag één hun administratie professioneel en schaalbaar willen inrichten. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "De nuchtere belofte: digitaal waar het kan, persoonlijk waar het moet"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Sommige online boekhouders zijn puur 'self-service' platformen. Ik pak dat anders aan. LUCIAN is geen softwarebedrijf, maar een administratiekantoor dat waar mogelijk slim gebruik maakt van software. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Persoonlijke check:"
								}]
							},
							{
								"t": "text",
								"v": " Ik controleer periodiek uw online invoer. Klopt de btw? Worden investeringen goed afgeschreven? "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Vast aanspreekpunt:"
								}]
							},
							{
								"t": "text",
								"v": " Ondanks de digitale werkwijze heeft u een vast gezicht bij uw cijfers. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Proactief advies:"
								}]
							},
							{
								"t": "text",
								"v": " Zie ik in uw online dashboard dat u fiscaal voordeel laat liggen? Dan trek ik aan de bel. Dat is de nuchtere betrokkenheid waar LUCIAN voor staat. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Stap over op slim en zorgeloos boekhouden"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Bent u klaar om de stap naar een online boekhouder te zetten? Of u nu uit de regio komt of elders in het land gevestigd bent: mijn digitale deuren staan wagenwijd open. Ik laat u graag zien hoe eenvoudig uw administratie kan zijn als de techniek en de juiste expert samenkomen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Laat de angst voor techniek of verandering u niet tegenhouden. Ik begeleid u stap voor stap bij de overgang naar een online administratie. Het resultaat? Meer overzicht, minder stress en meer tijd voor uw eigen onderneming. Wilt u weten welk pakket het beste bij u past? "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Neem vandaag nog contact met mij op voor een nuchter adviesgesprek."
							}
						]
					}
				]
			}]
		},
		{
			"id": 1478,
			"path": "/financiele-hulp/toeslagen-en-tegemoetkomingen.html",
			"title": "Hulp bij toeslagen en tegemoetkomingen | LUCIAN",
			"description": "Heeft u recht op toeslagen en/of tegemoetkomingen? LUCIAN helpt u met de Toeslagen-check. Voorkom terugbetalingen en loop geen geld mis. Neem direct contact op!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.3,
						"strong": true,
						"c": [
							{
								"t": "text",
								"v": "Toeslagen en tegemoetkomingen:"
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": "loop geen geld mis"
							}
						]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Heeft u recht op extra financiële steun, maar ziet u door de bomen het bos niet meer? Toeslagen en tegemoetkomingen zijn er om u te ondersteunen, maar de aanvraag en controle ervan kunnen ingewikkeld zijn. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Veel huishoudens laten onbewust geld liggen of komen achteraf voor vervelende verrassingen te staan, zoals terugbetalingen. Ik help u om optimaal gebruik te maken van de regelingen waar u recht op heeft, zodat u krijgt wat u toekomt. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Waarom hulp bij toeslagen inschakelen?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Het stelsel van de Belastingdienst en gemeentelijke regelingen verandert voortdurend. Een kleine wijziging in uw inkomen of gezinssituatie kan grote gevolgen hebben voor uw toeslagen. LUCIAN biedt rust en zekerheid door: "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Maximale benutting:"
								}]
							},
							{
								"t": "text",
								"v": " ik controleer of u alle mogelijke toeslagen (zoals zorgtoeslag, huurtoeslag of kindgebonden budget) ontvangt. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Voorkomen van schulden:"
								}]
							},
							{
								"t": "text",
								"v": " door uw gegevens nauwkeurig te toetsen, verklein ik de kans dat u later grote bedragen moet terugbetalen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Lokale regelingen:"
								}]
							},
							{
								"t": "text",
								"v": " naast landelijke toeslagen kijk ik ook naar gemeentelijke tegemoetkomingen waar u mogelijk recht op heeft. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Mijn werkwijze: van check tot aanvraag"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Hulp bij toeslagen is bij LUCIAN meer dan alleen een formulier invullen. Ik maak het onderdeel van uw totale financiële gezondheid. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De Toeslagen-check:"
								}]
							},
							{
								"t": "text",
								"v": " ik inventariseer uw huidige situatie. Welke toeslagen ontvangt u al en op welke heeft u – op basis van uw huidige inkomen – nog meer recht? "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Aanvraag en wijziging:"
								}]
							},
							{
								"t": "text",
								"v": " ik verzorg de volledige aanvraag voor u. Verandert er iets in uw leven, zoals een nieuwe baan of een verhuizing? Ik zorg dat de Belastingdienst direct op de hoogte gebracht wordt, zodat uw toeslagen altijd kloppen. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Controle van beschikkingen:"
								}]
							},
							{
								"t": "text",
								"v": " heeft u een brief ontvangen over een herberekening of een definitieve vaststelling? Ik kijk met u mee of deze berekening klopt en ondernemen actie als dat nodig is. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Rust in uw administratie"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Hulp bij toeslagen en tegemoetkomingen is bij uitstek geschikt voor wie behoefte heeft aan overzicht. Het geeft een veilig gevoel om te weten dat uw financiële basis goed geregeld is en dat u geen kansen onbenut laat. Of het nu gaat om de kinderopvangtoeslag of bijzondere bijstand, ik sta voor u klaar. "
							},
							{ "t": "br" },
							{ "t": "br" }
						]
					},
					{
						"t": "divider",
						"accent": false
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"c": [{
							"t": "text",
							"v": "Vrijblijvend kennis maken?"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " Wilt u zeker weten dat u geen geld laat liggen? Of heeft u hulp nodig bij een ingewikkelde aanvraag? Ik help u graag om uw recht op tegemoetkomingen volledig te benutten. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Laten we samen kijken naar uw mogelijkheden. Neem gerust contact op voor een kennismaking. "
							},
							{ "t": "br" },
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " Met vriendelijke groet, "
							},
							{ "t": "br" },
							{ "t": "br" },
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Andries Luchies"
								}]
							}
						]
					}
				]
			}]
		},
		{
			"id": 2223,
			"path": "/ondersteuning.html",
			"title": "Professionele Ondersteuning & Online Beheer | LUCIAN",
			"description": "LUCIAN ontzorgt ondernemers en particulieren. Van agenda- en mailbeheer tot SEO en websiteonderhoud. Neem contact op voor een vrijblijvend gesprek!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Ondersteuning"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Professionele hulp voor ondernemer en particulier"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Slokken dagelijkse randzaken teveel tijd op, loopt uw mailbox over of blijft uw website achter? Sinds 2009 help ik ondernemers en particulieren met het uit handen nemen van operationele en digitale taken. Met de doorontwikkeling van de dienstengroep Ondersteuning kiest u voor één betrouwbaar aanspreekpunt voor al uw organisatorische en online werkzaamheden."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Waarmee ik u kan ontzorgen:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[
								{
									"t": "span",
									"marks": ["strong"],
									"c": [{
										"t": "text",
										"v": "Operationele en organisatorische hulp"
									}]
								},
								{
									"t": "text",
									"v": ": agenda-en mailbeheer, klantenservice, e-mailafhandeling en documentenbeheer."
								},
								{ "t": "br" },
								{
									"t": "link",
									"href": "/ondersteuning/operationele-en-organisatorische-hulp.html",
									"c": [{
										"t": "text",
										"v": "Benieuwd hoeveel tijd u kunt besparen >>>"
									}]
								}
							],
							[
								{
									"t": "span",
									"marks": ["strong"],
									"c": [{
										"t": "text",
										"v": "Websitebeheer en -onderhoud"
									}]
								},
								{
									"t": "text",
									"v": ": technisch onderhoud & updates, contentbeheer & aanpassingen en troubleshooting & schoonmaak."
								},
								{ "t": "br" },
								{
									"t": "link",
									"href": "/ondersteuning/websitebeheer-en-onderhoud.html",
									"c": [{
										"t": "text",
										"v": "Benieuwd hoe u uw website moeiteloos up-to-date houdt >>>"
									}]
								}
							],
							[
								{
									"t": "span",
									"marks": ["strong"],
									"c": [{
										"t": "text",
										"v": "Search engine optimalisatie"
									}]
								},
								{
									"t": "text",
									"v": ": on-page optimalisatie, trefwoordenonderzoek (keyword research), het optimaliseren van afbeeldingen en lokaal beheer."
								},
								{ "t": "br" },
								{
									"t": "link",
									"href": "/ondersteuning/search-engine-optimalisatie.html",
									"c": [{
										"t": "text",
										"v": "Meer bezoekers, meer aanvragen, meer rendement uit uw website >>>"
									}]
								}
							],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Social media support en beheer"
								}]
							}, {
								"t": "text",
								"v": ": inplannen & publiceren berichten, maken visuele content, het managen van communities en het bijhouden van de/een contentkalender."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Direct uw randzaken uit handen geven?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Geen tijd meer verspillen en meteen doorschakelen? Laat mij uw randzaken organiseren, zodat u zich kunt richten op wat echt belangrijk is."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Vrijblijvend de mogelijkheden bespreken?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Neem vandaag nog contact met mij op voor een vrijblijvend kennismakingsgesprek. Ik bespreek graag op welke manier ik u en/of uw onderneming zou kunnen ontzorgen."
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Andries"
								}]
							}
						]
					}
				]
			}]
		},
		{
			"id": 2263,
			"path": "/ondersteuning/operationele-en-organisatorische-hulp.html",
			"title": "Operationele en Organisatorische Hulp | LUCIAN",
			"description": "U de regie, ik het regelwerk. Professionele organisatorische hulp, van agenda- en e-mailbeheer tot projectondersteuning. Krijg weer rust, focus en overzicht.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Operationele en Organisatorische Hulp"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "U de regie, ik het regelwerk"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als ondernemer of leidinggevende wilt u zich bezighouden met strategie en groei, niet met een uit de hand gelopen inbox of andere organisatorische randzaken. LUCIAN neemt u het organisatorische regelwerk uit handen, zodat u weer overzicht en rust ervaart."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wat houdt operationele en organisatorische hulp in?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Het runnen van een organisatie vraagt om een strakke achterkant. Wanneer e-mails zich opstapelen, de agenda dichtslibt en documenten onvindbaar zijn, vreet dat kostbare tijd en energie. Met gerichte en betrouwbare ondersteuning zorg ik ervoor dat uw dagelijkse werkprocessen vlekkeloos en gestroomlijnd verlopen."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Mijn Diensten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Hieronder een overzicht van de werkzaamheden waar u mij direct voor kunt inschakelen:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Agenda en e-mailbeheer"
								}]
							}, {
								"t": "text",
								"v": ": een georganiseerde inbox, prioritering van berichten en een efficiënt geplande agenda zonder dubbele afspraken."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Klantenservice & e-mailafhandeling"
								}]
							}, {
								"t": "text",
								"v": ": professionele en snelle beantwoording van vragen van uw klanten, via e-mail of andere communicatiekanalen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Documenten- en informatiebeheer"
								}]
							}, {
								"t": "text",
								"v": ": het structureren van digitale mappen, documenten opmaken in uw huisstijl en het up-to-date houden van relatiegegevens (CRM)."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Proces- en projectondersteuning"
								}]
							}, {
								"t": "text",
								"v": ": notuleren tijdens vergaderingen, het opvolgen van actiepunten en het bewaken van projectdeadlines."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Regel- en uitzoekwerk"
								}]
							}, {
								"t": "text",
								"v": ": praktische zaken uit handen nemen, zoals het opvragen van offertes, boeken van locaties/reizen of de organisatie van een evenement/bijeenkomst."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Hoe het samenwerken eruit ziet?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Geen enkele organisatie is hetzelfde. Daarom stem ik mijn ondersteuning af op uw specifieke behoeften. Of het nu gaat om een vast aantal uren per week of flexibele ondersteuning tijdens drukke perioden: u kunt rekenen op discretie, structuur en een proactieve instelling."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Tijd voor meer rust en overzicht!"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Benieuwd naar wat ik op operationeel-en organisatorisch vlak voor uw bedrijf kan betekenen? Neem vrijblijvend contact op om de mogelijkheden te bespreken."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 2376,
			"path": "/ondersteuning/websitebeheer-en-onderhoud.html",
			"title": "Websitebeheer en -onderhoud | LUCIAN",
			"description": "Zoekt u professionele hulp bij websitebeheer en -onderhoud? LUCIAN zorgt voor veilige updates, contentbeheer en een altijd werkende website.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Websitebeheer en -onderhoud"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Uw website veilig, actueel en zorgeloos online"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{
								"t": "text",
								"v": "Als ondernemer wilt u dat uw website altijd werkt, veilig is en uw organisatie professioneel representeert. Toch schiet het bijhouden van updates, het plaatsen van nieuwe content of het oplossen van technische storingen er vaak bij in. "
							},
							{ "t": "br" },
							{
								"t": "text",
								"v": "LUCIAN neemt u het beheer en onderhoud van uw website volledig uit handen, zodat u er geen omkijken naar heeft en u zich kunt richten op uw kernactiviteiten."
							}
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wat houdt websitebeheer en -onderhoud in?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Een website is geen eenmalig project, maar een continu proces. Verouderde plugins, beveiligingslekken of verouderde informatie kunnen zorgen voor storingen, verlies van bezoekers en zelfs veiligheidsrisico’s. Met gerichte en betrouwbare ondersteuning zorg ik ervoor dat uw website technisch in topconditie blijft, snel geladen wordt en inhoudelijk altijd up-to-date is."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Mijn Diensten"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Hieronder een overzicht van de werkzaamheden waar u mij direct voor kunt inschakelen:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Technisch onderhoud & updates"
								}]
							}, {
								"t": "text",
								"v": ": het regelmatig bijwerken van uw CMS (zoals WordPress), thema’s en plugins om de stabiliteit en functionaliteit te waarborgen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Beveiliging & back-ups"
								}]
							}, {
								"t": "text",
								"v": ": periodieke veiligheidschecks, het uitvoeren van back-ups en preventieve maatregelen om uw website te beschermen tegen cyberrisico’s."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Contentbeheer & aanpassingen"
								}]
							}, {
								"t": "text",
								"v": ": het snel en nauwkeurig plaatsen van nieuwe teksten, afbeeldingen, nieuwsartikelen of pagina’s in uw eigen huisstijl."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Snelheid- en kwaliteitscontrole"
								}]
							}, {
								"t": "text",
								"v": ": het controleren en herstellen van gebroken links, het optimaliseren van de laadsnelheid en zorgen voor een goede weergave op mobiele apparaten."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Ondersteuning & probleemoplossing"
								}]
							}, {
								"t": "text",
								"v": ": het verhelpen van kleine technische storingen en directe hulp bij vragen of gewenste uitbreidingen aan uw website."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Hoe het samenwerken eruit ziet?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Geen enkele organisatie of website is hetzelfde. Daarom stem ik het websitebeheer af op uw specifieke wensen en de eisen van uw platform. Of het nu gaat om periodieke technische checks, flexibel onderhoud op aanvraag of het volledig uitbesteden van uw contentbeheer: u kunt rekenen op zorgvuldigheid, continuïteit en een snelle respons."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Tijd voor een zorgeloze en goed werkende website!"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Benieuwd naar wat ik op het gebied van websitebeheer en -onderhoud voor uw bedrijf kan betekenen? Neem vrijblijvend contact op om de mogelijkheden te bespreken."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 2457,
			"path": "/info/kenniscentrum/administratie.html",
			"title": "Kenniscentrum-Administratie | LUCIAN",
			"description": "Alles weten over financiële administratie? Ontdek praktische tips en helder advies in het Kenniscentrum-administratie van LUCIAN.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Kenniscentrum > Administratie"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Oftewel, volop opiniestukken, artikelen, reviews en tips & tricks over alles wat raakvlakken heeft met financiële administratie, bedrijfseconomisch advies en administratieve organisatie & interne beheersing:"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Volg simpelweg de hyperlink naar het stuk waar uw interesse naar uitgaat!"
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "#boekhouding #financieleadministratie #jaarverslag #internebeheersing #bedrijfseconomischadvies #liquiditeitsbegroting #quickscan #verbeterpotentieel #quickwins #financiering #audit #kostprijsberekening"
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 2473,
			"path": "/info/kenniscentrum/belastingen.html",
			"title": "Kenniscentrum-Belastingen | LUCIAN",
			"description": "Slim besparen op je belastingen? Ontdek praktische tips, regelgeving en advies in het Kenniscentrum-belastingen van LUCIAN. Haal het maximale uit je aangifte!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Kenniscentrum > Belastingen"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Oftewel, volop opiniestukken, artikelen, reviews en tips & tricks over alles wat raakvlakken heeft met inkomstenbelasting, vennootschapsbelasting, omzetbelasting, dividendbelasting en erf-en schenkrecht:"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Volg simpelweg de hyperlink naar het stuk waar uw interesse naar uitgaat!"
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "#inkomstenbelasting #omzetbelasting #btw #vennootschapsbelasting #aangifte #toeslagen #loonbelasting #voorlopigeaanslag #erfbelasting #suppletie #dividendbelasting #icp"
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 2475,
			"path": "/info/kenniscentrum/financien.html",
			"title": "Kenniscentrum-Financiën | LUCIAN",
			"description": "Bouw aan een financieel gezonde onderneming! Ontdek inzichten, advies en handige hulpmiddelen over financiën in het Kenniscentrum-financiën van LUCIAN.",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Kenniscentrum > Financiën"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Oftewel, volop opiniestukken, artikelen, reviews en tips & tricks over alles wat raakvlakken heeft met budgetbeheer-en coaching, schuldhulpverlening, hulp bij toeslagen & tegemoetkomingen en financiële planning:"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Volg simpelweg de hyperlink naar het stuk waar uw interesse naar uitgaat!"
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "#(problematische) schulden #schuldhulp #schuldhulpverlening #hulp bij geldzorgen #budgetbeheer #budgetcoaching #toeslagen #tegemoetkomingen #financiële planning #financiële onafhankelijkheid"
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 2477,
			"path": "/info/kenniscentrum/support.html",
			"title": "Kenniscentrum-Support | LUCIAN",
			"description": "Lees artikelen en tips over virtuele ondersteuning, mail- en agendabeheer, website-onderhoud, SEO en social media support. Kenniscentrum-support van LUCIAN!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Kenniscentrum > Support"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Oftewel, volop opiniestukken, artikelen, reviews en tips & tricks over alles wat raakvlakken heeft met operationele en organisatorische hulp (zoals bijv. agenda-en mailbeheer), websitebeheer en -onderhoud, search engine optimalisatie en social media support en -beheer."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Volg simpelweg de hyperlink naar het stuk waar uw interesse naar uitgaat!"
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "#ondersteuning #virtualassistant #virtueelassistent #officemanagement #zakelijkeondersteuning #administratieveondersteuning #projectondersteuning #ontzorgen #zzpondersteuning #productiviteit #efficiënterwerken #bedrijfsvoering"
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 2519,
			"path": "/info/acties/starterspakket.html",
			"title": "Starterspakket | LUCIAN",
			"description": "Zorgeloos starten als ondernemer? Met het Starterspakket van LUCIAN investeer je pas in je administratie zodra je omzet maakt. Geen omzet = geen factuur!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Starterspakket"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Als (startend) ondernemer direct een vliegende start!"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wil je als startende ondernemer zorgeloos aan de slag en zie je op tegen onduidelijke en hoge aanloopkosten? Met het Starterspakket van LUCIAN investeer je pas in je administratie zodra je onderneming daadwerkelijk geld gaat genereren."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wat maakt het Starterspakket bijzonder?"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[
								{
									"t": "span",
									"marks": ["strong"],
									"c": [{
										"t": "text",
										"v": "Geen omzet = geen factuur"
									}]
								},
								{ "t": "br" },
								{
									"t": "text",
									"v": "Maak je minder dan €250 omzet in een bepaalde maand? Dan betaal je helemaal niets."
								}
							],
							[
								{
									"t": "span",
									"marks": ["strong"],
									"c": [{
										"t": "text",
										"v": "Geen risico"
									}]
								},
								{ "t": "br" },
								{
									"t": "text",
									"v": "Komt je onderneming onverhoopt niet van de grond? Dan vervallen de kosten."
								}
							],
							[
								{
									"t": "span",
									"marks": ["strong"],
									"c": [{
										"t": "text",
										"v": "Spreiding"
									}]
								},
								{ "t": "br" },
								{
									"t": "text",
									"v": "Eenmalige en jaarlijkse kosten voldoe je eenvoudig in 12 gelijke maandtermijnen, pas vanaf het moment dat er omzet binnenkomt."
								}
							],
							[
								{
									"t": "span",
									"marks": ["strong"],
									"c": [{
										"t": "text",
										"v": "Startersvoordeel"
									}]
								},
								{ "t": "br" },
								{
									"t": "text",
									"v": "Pas bij een jaaromzet vanaf € 50.000,- of tot 2 jaar na je KVK-inschrijving, stroom je moeiteloos door naar het reguliere tarief."
								}
							]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Module : Startersbegeleiding (Gratis)"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Aanmelding KVK & Belastingdienst, aanvraag financiering (max. 2) en inrichting van je administratie."
						}]
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Module : Financiële Administratie (€720,-/jaar)"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Volledige verwerking van de administratie, inclusief opmaken kwartaal- en jaarrekening en tussentijds advies."
						}]
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Module : Fiscaliteiten (€360,-/jaar)"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Aangiften inkomstenbelasting, vennootschapsbelasting en omzetbelasting (BTW) + fiscaal advies."
						}]
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Module : Bedrijfseconomisch Advies (€480,-/jaar)"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Hulp bij het opstellen van je ondernemingsplan, liquiditeitsbegroting en resultatenprognose."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Over LUCIAN"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "LUCIAN is geen standaard administratiekantoor, maar jouw full-service financiële partner. Van de dagelijkse boekhouding tot strategisch fiscaal advies: één vast aanspreekpunt voor al je geldzaken."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Kennismaken?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Sparren over je plannen of direct gebruikmaken van dit aanbod? Neem vrijblijvend contact met mij op, op de manieren vermeld in de footer."
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Andries"
								}]
							}
						]
					}
				]
			}]
		},
		{
			"id": 2591,
			"path": "/info/acties/hoeveel-ben-ik-waard.html",
			"title": "Hoeveel ben ik waard | LUCIAN",
			"description": "Wil je precies weten hoe je er financieel voor staat? Laat kosteloos je vermogenspositie in kaart brengen door LUCIAN. Hoeveel ben ik waard!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Hoeveel ben ik waard?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Ontdek wat je écht waard bent: je vermogen volledig in kaart"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wil je precies weten hoe je er financieel voor staat? Als speciale kennismakingsactie breng ik jouw complete vermogenspositie kosteloos in kaart. Met een helder overzicht van je bezittingen en schulden krijg je direct antwoord op de vraag: hoeveel ben ik waard?"
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Vrijblijvend sparren of vragen?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Heb je interesse of wil je eerst even overleggen? Neem gerust contact met mij op, op de manieren vermeld in de footer."
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [
							{ "t": "br" },
							{
								"t": "text",
								"v": " "
							},
							{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Andries"
								}]
							}
						]
					}
				]
			}]
		},
		{
			"id": 2615,
			"path": "/ondersteuning/search-engine-optimalisatie.html",
			"title": "Search Engine Optimalisatie (SEO) | LUCIAN",
			"description": "Verbeter uw online vindbaarheid met search engine optimalisatie (SEO) door LUCIAN. Trek meer relevante bezoekers, verhoog uw autoriteit en genereer meer leads!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Search engine optimalisatie (SEO)"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Meer bezoekers, meer aanvragen, meer rendement uit uw website"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als ondernemer wilt u dat uw potentiële klanten u snel weten te vinden op het moment dat zij zoeken naar uw producten of diensten. Toch blijkt het in de praktijk een flinke uitdaging om hoog te scoren in zoekmachines zoals Google. Waardevolle bezoekers én omzet belanden daardoor vaak bij de concurrent."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "LUCIAN helpt u om de online vindbaarheid van uw organisatie structureel te verbeteren. Met gerichte SEO zorg ik voor meer relevante bezoekers op uw website, een hogere autoriteit in uw markt én meer aanvragen of verkopen."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wat houdt Search Engine Optimalisatie (SEO) in?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "SEO is meer dan alleen het toevoegen van een paar trefwoorden. Het is een doordachte, continue strategie om uw website op alle fronten aantrekkelijk te maken voor zowel uw doelgroep als zoekmachines."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Google kijkt naar honderden factoren om te bepalen welke websites bovenaan staan: van de technische gezondheid van uw site tot de kwaliteit van uw content en de autoriteit van uw domein. Met een heldere en transparante aanpak zorg ik ervoor dat al deze aspecten perfect op elkaar zijn afgestemd."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Mijn SEO-services"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "SEO bestaat uit drie essentiële pijlers. Hieronder leest u hoe ik uw online vindbaarheid stap voor stap naar een hoger plan til:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Zoekwoordenonderzoek & Strategie"
								}]
							}, {
								"t": "text",
								"v": ": het in kaart brengen van de exacte zoektermen die uw potentiële klanten gebruiken, inclusief een analyse van de concurrentie en een helder actieplan."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "On-Page & Content Optimization"
								}]
							}, {
								"t": "text",
								"v": ": het optimaliseren en schrijven van waardevolle teksten, meeslepende koppen en relevante meta-titels en -beschrijvingen die uitnodigen tot klikken."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Technische SEO"
								}]
							}, {
								"t": "text",
								"v": ": het verbeteren van de laadsnelheid, de indexeerbaarheid, de sitestructuur en de mobiele gebruikerservaring, zodat zoekmachine-crawlers uw website foutloos kunnen lezen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Autoriteit & Linkbuilding (Off-Page SEO)"
								}]
							}, {
								"t": "text",
								"v": ": het versterken van het online profiel van uw website door middel van kwalitatieve en relevante backlinks en vermeldingen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Lokale SEO (Google Mijn Bedrijf)"
								}]
							}, {
								"t": "text",
								"v": ": het optimaal vindbaar maken van uw organisatie binnen uw eigen regio of werkgebied voor lokale zoekopdrachten."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Monitoring & Rapportage"
								}]
							}, {
								"t": "text",
								"v": ": duidelijke inzichten in uw posities, het aantal bezoekers en het behaalde rendement. Geen ingewikkelde vaktaal, maar duidelijke resultaten."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Hoe de samenwerking eruit ziet"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Elke markt en organisatie is uniek. Daarom begin ik altijd met een grondige analyse van uw huidige positie en kansen. Of u nu lokaal beter gevonden wilt worden, een specifieke dienst extra wilt uitlichten of een volledige SEO-strategie wilt uitbesteden: u kunt rekenen op een persoonlijke benadering, eerlijk advies en meetbaar resultaat."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Klaar voor betere online vindbaarheid?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Wilt u dat uw website écht voor uw bedrijf gaat werken en dagelijks nieuwe klanten trekt? Neem vrijblijvend contact op om de mogelijkheden en kansen voor uw organisatie te bespreken."
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Met vriendelijke groet,"
						}]
					},
					{
						"t": "paragraph",
						"c": [{ "t": "br" }]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Andries"
							}]
						}]
					}
				]
			}]
		},
		{
			"id": 2641,
			"path": "/info/acties/mystery-guest.html",
			"title": "Mystery Guest | LUCIAN",
			"description": "Hoe ervaart een klant jouw bedrijf écht? Test je service, website, SEO en social media met de gratis Mystery Guest Scan van LUCIAN. Vraag hem nu aan!",
			"sections": [{
				"t": "prose",
				"variant": "article",
				"width": "text",
				"blocks": [
					{
						"t": "heading",
						"level": 1,
						"accent": true,
						"size": 1.4,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Mystery guest"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "span",
							"marks": ["strong"],
							"c": [{
								"t": "text",
								"v": "Ervaar je bedrijf door de ogen van de klant"
							}]
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Als ondernemer werk je in je bedrijf, waardoor het lastig is om er vanaf een afstand naar te kijken. Jij ziet je processen zoals ze bedoeld zijn, niet zoals ze in het echt functioneren. Maar hoe ervaart een potentiële klant jouw bedrijf écht wanneer ze contact opnemen, je website bezoeken of je social media scannen?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Kleine haperingen in communicatie of techniek kosten ongemerkt klanten en omzet. Met de gratis Mystery Guest Scan van LUCIAN test ik jouw digitale voordeur op een laagdrempelige en objectieve manier."
						}]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wat is de Mystery Guest Scan?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Binnen 24 tot 48 uur worden er op de achtergrond 4 snelle, haarscherpe stresstests uitgevoerd op jouw organisatie:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De Respons- & Servicetest"
								}]
							}, {
								"t": "text",
								"v": ": er wordt een reële klantvraag gestuurd via je e-mail of contactformulier. Hoe snel reageer je? Is de opvolging professioneel en klopt de toon?"
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De Website & Techniek Scan"
								}]
							}, {
								"t": "text",
								"v": ": je website wordt geanalyseerd op mobiel en desktop. Laadt de site snel genoeg, werken alle links en is de informatie actueel?"
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De Vindbaarheid Check (SEO)"
								}]
							}, {
								"t": "text",
								"v": ": er wordt gecontroleerd hoe je bedrijf scoort in de bekende zoekmachines op relevante zoektermen en lokale vindbaarheid."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "De Social Media Check"
								}]
							}, {
								"t": "text",
								"v": ": je actieve kanalen worden geanalyseerd op uitstraling, betrouwbaarheid en interactie met volgers."
							}]
						]
					},
					{
						"t": "divider",
						"accent": true
					},
					{
						"t": "heading",
						"level": 2,
						"accent": true,
						"strong": true,
						"c": [{
							"t": "text",
							"v": "Wat levert deze gratis audit jou op?"
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Geen dik, ingewikkeld rapport, maar een heldere en praktische terugkoppeling op 1 A4:"
						}]
					},
					{
						"t": "list",
						"ordered": false,
						"c": [
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Rapportcijfers"
								}]
							}, {
								"t": "text",
								"v": ": overzichtelijke scores op de 4 geteste onderdelen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Top 3 blinde vlekken"
								}]
							}, {
								"t": "text",
								"v": ": direct inzicht in waar je nu tijd, uitstraling of klanten laat liggen."
							}],
							[{
								"t": "span",
								"marks": ["strong"],
								"c": [{
									"t": "text",
									"v": "Quick-Wins"
								}]
							}, {
								"t": "text",
								"v": ": direct toepasbare verbeterpunten die je zelf kunt doorvoeren óf aan ons kunt uitbesteden."
							}]
						]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "text",
							"v": "Geen lange vragenlijsten of urenlange gesprekken vooraf. Vul de vragen in en wij gaan direct op de achtergrond voor je aan de slag."
						}]
					},
					{
						"t": "paragraph",
						"c": [{
							"t": "link",
							"href": "mailto:info@luciancs.nl?subject=Mystery Guest%20Scan&body=Beste,%0D%0A%0D%0AGraag%20maak%20ik%20gebruik%20van%20de%20Mystery%20Guest%20Scan.%20Dit%20zijn%20mijn%20gegevens:%0D%0A%0D%0ANaam:%20%0D%0ABedrijfsnaam:%20%0D%0AWebsite%20URL:%20%0D%0AE-mail%20(waar%20het%20rapport%20naartoe%20moet):%20",
							"c": [{
								"t": "text",
								"v": "Vraag je gratis Mystery Guest Scan aan →"
							}],
							"button": true
						}],
						"align": "center"
					}
				]
			}]
		}
	]
};
var site_default = {
	source: "https://www.luciancs.nl",
	sourceUpdated: "2026-09-18T15:16:43",
	brand: "LUCIAN",
	heroHeading: "Helder in cijfers, nuchter als ontzorger",
	nav: [
		{
			"label": "Over",
			"href": "/over.html"
		},
		{
			"label": "Administratiekantoor",
			"href": "/administratiekantoor.html"
		},
		{
			"label": "Belastingadviseur",
			"href": "/belastingadviseur.html"
		},
		{
			"label": "Financiële hulp",
			"href": "/financiele-hulp.html"
		},
		{
			"label": "Ondersteuning",
			"href": "/ondersteuning.html"
		},
		{
			"label": "Contact",
			"href": "/contact.html"
		}
	],
	columns: [
		{
			"title": "Adres",
			"lines": [
				[{
					"t": "text",
					"v": "Andries Luchies"
				}],
				[{
					"t": "text",
					"v": "Brederolaan 19"
				}],
				[{
					"t": "text",
					"v": "9673 GM"
				}],
				[{
					"t": "text",
					"v": "Winschoten"
				}]
			]
		},
		{
			"title": "Contact",
			"lines": [
				[{
					"t": "text",
					"v": "Email:"
				}],
				[{
					"t": "link",
					"href": "mailto:info@luciancs.nl",
					"c": [{
						"t": "text",
						"v": "info@luciancs.nl"
					}]
				}],
				[{
					"t": "text",
					"v": "Mobiel:"
				}],
				[{
					"t": "link",
					"href": "tel:0655684505",
					"c": [{
						"t": "text",
						"v": "06-55684505"
					}]
				}]
			]
		},
		{
			"title": "Info",
			"lines": [
				[{
					"t": "link",
					"href": "/info/acties.html",
					"c": [{
						"t": "text",
						"v": "Acties"
					}]
				}],
				[{
					"t": "link",
					"href": "/info/kenniscentrum.html",
					"c": [{
						"t": "text",
						"v": "Kenniscentrum"
					}]
				}],
				[{
					"t": "link",
					"href": "/wp-content/uploads/2026/08/AV.pdf",
					"c": [{
						"t": "text",
						"v": "AV"
					}]
				}],
				[{
					"t": "link",
					"href": "/info/disclaimer.html",
					"c": [{
						"t": "text",
						"v": "Disclaimer"
					}]
				}]
			]
		}
	],
	social: [
		{
			"name": "facebook",
			"href": "https://www.facebook.com/lucianwinschoten"
		},
		{
			"name": "linkedin",
			"href": "https://nl.linkedin.com/in/andriesluchies"
		},
		{
			"name": "twitter",
			"href": "https://twitter.com/andriesluchies"
		}
	],
	contact: {
		"name": "Andries Luchies",
		"street": "Brederolaan 19",
		"postalCode": "9673 GM",
		"city": "Winschoten",
		"email": "info@luciancs.nl",
		"phone": "06-55684505",
		"phoneHref": "tel:0655684505"
	},
	canonicalOrigin: "https://www.luciancs.nl"
};
//#endregion
//#region src/lib/content.ts
/** The importer only emits icon names it can prove exist in icons.tsx; this
*  keeps that promise visible in the type system instead of trusting a cast. */
var isIconName = (value) => iconNames.includes(value);
var normalise = (pages) => pages.map((page) => ({
	...page,
	sections: page.sections.map((section) => section.t === "services" ? {
		...section,
		cards: section.cards.map((card) => {
			if (!isIconName(card.icon)) throw new Error(`unknown icon "${card.icon}" on ${page.path} - re-run the import`);
			return card;
		})
	} : section)
}));
var pages = normalise(pages_default.pages);
var site = site_default;
var pagesByPath = Object.fromEntries(pages.map((page) => [page.path, page]));
/** Old WordPress shortlinks (`/index.html?p=7`) still resolve, page id to path. */
var pathByWpId = Object.fromEntries(pages.map((page) => [String(page.id), page.path]));
/** The page a 404 renders as; it exists so the route has real metadata. */
var notFoundPage = {
	id: 0,
	path: "/404.html",
	title: "Pagina niet gevonden - LUCIAN",
	description: "Deze pagina bestaat niet of is verplaatst.",
	sections: []
};
var homePage = pagesByPath["/"];
if (!homePage) throw new Error("content/pages.json has no '/' page");
var navLabelByPath = Object.fromEntries(site.nav.map((item) => [item.href, item.label]));
/** WordPress SEO titles ("Boekhouder Winschoten | LUCIAN") cut back to the name. */
function shortTitle(title) {
	return title.replace(/^LUCIAN\s*:\s*/i, "").replace(/\s*[|–—-]\s*LUCIAN\b.*$/i, "").trim() || title;
}
/**
* Several pages title themselves "Name: a longer promise"; the name is enough.
* One heading is "Kenniscentrum > Administratie", and a ">" inside a crumb
* reads as a breadcrumb separator, so it is spelled out.
*/
var namePart = (text) => text.split(/[:|]/)[0].replace(/\s*>\s*/g, " · ").trim() || text;
function ownHeading(page) {
	for (const section of page.sections) {
		if (section.t !== "prose") continue;
		for (const block of section.blocks) if (block.t === "heading" && block.level === 1) {
			const text = block.c.map((node) => "v" in node ? node.v : "").join("").trim();
			if (text) return text;
		}
	}
}
/**
* Breadcrumb labels, in the order the site itself would say them: the menu's own
* word if the page is in the menu, otherwise the page's heading, otherwise the
* cleaned SEO title. Nothing is truncated - two of these run to 57 characters
* and mangling a name to fit a rail is worse than letting it wrap.
*/
function labelFor(path) {
	const fromNav = navLabelByPath[path];
	if (fromNav) return fromNav;
	const page = pagesByPath[path];
	if (!page) return (path.split("/").filter(Boolean).at(-1) ?? "").replace(/\.html$/, "").replace(/-/g, " ");
	return namePart(ownHeading(page) ?? shortTitle(page.title));
}
/** Breadcrumb trail derived from the URL, using the labels the menu uses. */
function crumbsFor(path) {
	const crumbs = [{
		label: site.brand,
		href: "/"
	}];
	let prefix = "";
	for (const segment of path.replace(/^\//, "").replace(/\.html$/, "").split("/").filter(Boolean)) {
		prefix += `/${segment}`;
		const asPage = `${prefix}.html`;
		const href = pagesByPath[asPage] ? asPage : prefix;
		crumbs.push({
			label: labelFor(href),
			href
		});
	}
	return crumbs;
}
/** Most pages open with their own h1 in the article; a few have no body at all. */
function hasOwnTitle(page) {
	return page.sections.some((section) => section.t === "prose" && section.blocks.some((block) => block.t === "heading" && block.level === 1));
}
//#endregion
//#region src/lib/layout.ts
/** The page shell every band shares: one place to change the gutter or measure. */
var pageShell = "mx-auto w-full max-w-page px-5 sm:px-6 lg:px-8";
/** Vertical rhythm for the content bands. */
var bandPadding = "py-14 sm:py-20 lg:py-24";
//#endregion
//#region src/components/Hero.tsx
/**
* Homepage opening.
*
* One full-width photograph, one sentence taken from the site's own meta
* description, and two ways onward. The original put the tagline in the middle
* of a 460px band and repeated the same banner on all 41 pages; here the photo
* carries the homepage and interior pages get a slim band instead.
*/
function Hero() {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative isolate flex min-h-[34rem] items-end overflow-hidden bg-ink lg:min-h-[40rem]",
		children: [
			/* @__PURE__ */ jsx("img", {
				src: "/media/denker.avif",
				alt: "",
				"aria-hidden": "true",
				className: "absolute inset-0 -z-20 size-full object-cover object-[52%_35%]"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 -z-10 bg-linear-to-b from-ink/65 via-ink/72 to-ink/93",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cn$1(pageShell, "pt-32 pb-14 sm:pb-18 lg:pb-22"),
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "max-w-4xl font-heading text-[clamp(2.125rem,5.2vw,3.375rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-white text-balance",
						children: site.heroHeading
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/75 text-pretty",
						children: homePage.description
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "cta",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/contact.html",
								children: ["Neem contact op", /* @__PURE__ */ jsx(ArrowRight, { "data-icon": "inline-end" })]
							})
						}), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "cta",
							variant: "outline",
							className: "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white",
							children: /* @__PURE__ */ jsx("a", {
								href: "#diensten",
								children: "Bekijk diensten"
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/ui/breadcrumb.tsx
function Breadcrumb({ className, ...props }) {
	return /* @__PURE__ */ jsx("nav", {
		"aria-label": "breadcrumb",
		"data-slot": "breadcrumb",
		className: cn(className),
		...props
	});
}
function BreadcrumbList({ className, ...props }) {
	return /* @__PURE__ */ jsx("ol", {
		"data-slot": "breadcrumb-list",
		className: cn("flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground", className),
		...props
	});
}
function BreadcrumbItem({ className, ...props }) {
	return /* @__PURE__ */ jsx("li", {
		"data-slot": "breadcrumb-item",
		className: cn("inline-flex items-center gap-1", className),
		...props
	});
}
function BreadcrumbLink({ asChild, className, ...props }) {
	const Comp = asChild ? Slot.Root : "a";
	return /* @__PURE__ */ jsx(Comp, {
		"data-slot": "breadcrumb-link",
		className: cn("transition-colors hover:text-foreground", className),
		...props
	});
}
function BreadcrumbPage({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "breadcrumb-page",
		role: "link",
		"aria-disabled": "true",
		"aria-current": "page",
		className: cn("font-normal text-foreground", className),
		...props
	});
}
function BreadcrumbSeparator({ children, className, ...props }) {
	return /* @__PURE__ */ jsx("li", {
		"data-slot": "breadcrumb-separator",
		role: "presentation",
		"aria-hidden": "true",
		className: cn("[&>svg]:size-3.5", className),
		...props,
		children: children ?? /* @__PURE__ */ jsx(ChevronRightIcon, {})
	});
}
//#endregion
//#region src/components/PageHeader.tsx
/**
* The band under the header on every page except the homepage.
*
* It keeps the brand photograph and the maroon ink of the original hero but at
* a third of the height, and it carries the one thing the original site had no
* version of at all: a breadcrumb, derived from the URL and the menu. Pages
* whose article already opens with an h1 do not repeat that title here.
*/
function PageHeader({ page }) {
	const crumbs = crumbsFor(page.path);
	return /* @__PURE__ */ jsxs("section", {
		className: "relative isolate overflow-hidden bg-ink",
		children: [
			/* @__PURE__ */ jsx("img", {
				src: "/media/denker.avif",
				alt: "",
				"aria-hidden": "true",
				className: "absolute inset-0 -z-20 size-full object-cover object-[52%_28%] opacity-40"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/85 to-ink/70",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cn$1(pageShell, "pt-28 pb-9 sm:pt-32 sm:pb-11"),
				children: [crumbs.length > 1 ? /* @__PURE__ */ jsx(Breadcrumb, { children: /* @__PURE__ */ jsx(BreadcrumbList, {
					className: "text-white/60",
					children: crumbs.map((crumb, index) => {
						const last = index === crumbs.length - 1;
						return /* @__PURE__ */ jsxs("span", {
							className: "contents",
							children: [/* @__PURE__ */ jsx(BreadcrumbItem, { children: last ? /* @__PURE__ */ jsx(BreadcrumbPage, {
								className: "font-medium text-white/90",
								children: crumb.label
							}) : /* @__PURE__ */ jsx(BreadcrumbLink, {
								asChild: true,
								className: "transition-colors hover:text-white",
								children: /* @__PURE__ */ jsx(Link, {
									to: crumb.href,
									children: crumb.label
								})
							}) }), last ? null : /* @__PURE__ */ jsx(BreadcrumbSeparator, { className: "text-white/30" })]
						}, crumb.href);
					})
				}) }) : null, hasOwnTitle(page) ? null : /* @__PURE__ */ jsx("h1", {
					className: "mt-4 font-heading text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-white text-balance",
					children: shortTitle(page.title)
				})]
			})
		]
	});
}
//#endregion
//#region src/components/Inline.tsx
/**
* Emphasis in the imported content, rendered as inline elements.
*
* The source used <strong>, <em> and coloured spans; those become real
* elements and brand colours rather than font weights alone, which is what a
* screen reader and a search engine both see.
*/
var MARK_CLASS = {
	strong: "font-semibold text-foreground",
	em: "italic",
	underline: "underline underline-offset-2",
	accent: "text-primary",
	muted: "text-muted-foreground"
};
var SEMANTIC_TAG = {
	strong: "strong",
	em: "em"
};
var LINK_CLASS = "font-medium text-primary decoration-primary/35 underline-offset-4 hover:decoration-primary transition-[text-decoration-color] underline";
function Inlines({ nodes, linkClassName }) {
	return /* @__PURE__ */ jsx(Fragment, { children: nodes.map((node, index) => /* @__PURE__ */ jsx(InlineNode, {
		node,
		linkClassName
	}, index)) });
}
function InlineNode({ node, linkClassName }) {
	switch (node.t) {
		case "text": return /* @__PURE__ */ jsx(Fragment, { children: node.v });
		case "br": return /* @__PURE__ */ jsx("br", {});
		case "span": {
			const className = node.marks.map((mark) => MARK_CLASS[mark]).join(" ");
			const semantic = node.marks.length === 1 ? SEMANTIC_TAG[node.marks[0]] : void 0;
			const body = /* @__PURE__ */ jsx(Inlines, {
				nodes: node.c,
				linkClassName
			});
			if (semantic === "strong") return /* @__PURE__ */ jsx("strong", {
				className,
				children: body
			});
			if (semantic === "em") return /* @__PURE__ */ jsx("em", {
				className,
				children: body
			});
			return /* @__PURE__ */ jsx("span", {
				className,
				children: body
			});
		}
		case "link": {
			if (node.button) return /* @__PURE__ */ jsx(Link, {
				to: node.href,
				className: cn$1(buttonVariants({ size: "cta" }), "my-2"),
				children: /* @__PURE__ */ jsx(Inlines, {
					nodes: node.c,
					linkClassName
				})
			});
			const className = linkClassName ?? LINK_CLASS;
			if (node.href.startsWith("/") && !node.href.startsWith("//")) return /* @__PURE__ */ jsx(Link, {
				to: node.href,
				className,
				children: /* @__PURE__ */ jsx(Inlines, {
					nodes: node.c,
					linkClassName
				})
			});
			return /* @__PURE__ */ jsx("a", {
				href: node.href,
				className,
				...node.external ? {
					target: "_blank",
					rel: "noopener noreferrer"
				} : {},
				children: /* @__PURE__ */ jsx(Inlines, {
					nodes: node.c,
					linkClassName
				})
			});
		}
	}
}
//#endregion
//#region src/components/ui/label.tsx
function Label$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Label.Root, {
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
//#endregion
//#region src/components/ui/separator.tsx
function Separator$1({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ jsx(Separator.Root, {
		"data-slot": "separator",
		decorative,
		orientation,
		className: cn("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", className),
		...props
	});
}
//#endregion
//#region src/components/ui/field.tsx
function FieldGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "field-group",
		className: cn("group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4", className),
		...props
	});
}
var fieldVariants = cva("group/field flex w-full gap-2 data-[invalid=true]:text-destructive", {
	variants: { orientation: {
		vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
		horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
		responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
	} },
	defaultVariants: { orientation: "vertical" }
});
function Field({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		"data-slot": "field",
		"data-orientation": orientation,
		className: cn(fieldVariants({ orientation }), className),
		...props
	});
}
function FieldLabel({ className, ...props }) {
	return /* @__PURE__ */ jsx(Label$1, {
		"data-slot": "field-label",
		className: cn("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50 has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-3 has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50 *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col", className),
		...props
	});
}
function FieldError({ className, children, errors, ...props }) {
	const content = useMemo(() => {
		if (children) return children;
		if (!errors?.length) return null;
		const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];
		if (uniqueErrors?.length == 1) return uniqueErrors[0]?.message;
		return /* @__PURE__ */ jsx("ul", {
			className: "ml-4 flex list-disc flex-col gap-1",
			children: uniqueErrors.map((error, index) => error?.message && /* @__PURE__ */ jsx("li", { children: error.message }, index))
		});
	}, [children, errors]);
	if (!content) return null;
	return /* @__PURE__ */ jsx("div", {
		role: "alert",
		"data-slot": "field-error",
		className: cn("text-sm font-normal text-destructive", className),
		...props,
		children: content
	});
}
//#endregion
//#region src/components/ui/input.tsx
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ jsx("input", {
		type,
		"data-slot": "input",
		className: cn("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
//#endregion
//#region src/components/ui/textarea.tsx
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ jsx("textarea", {
		"data-slot": "textarea",
		className: cn("flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
//#endregion
//#region src/components/ContactForm.tsx
var FIELDS = [
	{
		name: "Naam",
		label: "Naam",
		type: "text",
		required: true,
		maxLength: 400
	},
	{
		name: "Email",
		label: "Email",
		type: "email",
		required: true,
		maxLength: 400
	},
	{
		name: "Mobiel",
		label: "Mobiel",
		type: "tel",
		required: false,
		maxLength: 12
	},
	{
		name: "Onderwerp",
		label: "Onderwerp",
		type: "text",
		required: true,
		maxLength: 400
	}
];
/**
* The contact form.
*
* The original posted to WordPress' Contact Form 7, which does not exist in a
* static build, so there is no endpoint to post to. Rather than ship a form
* that silently loses messages, submitting composes the same message as a mail
* to the office and hands it to the visitor's mail client.
*
* Replace `compose` with a real endpoint (a form service, a small function, the
* client's own mail setup) before this goes live on their domain. The
* confirmation below says the mail client opened, not that mail was sent.
*/
function ContactForm() {
	const [errors, setErrors] = useState({});
	const [opened, setOpened] = useState(false);
	const onSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const value = (name) => String(data.get(name) ?? "").trim();
		const next = {};
		if (!value("Naam")) next.Naam = "Vul uw naam in.";
		if (!value("Email")) next.Email = "Vul uw e-mailadres in.";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("Email"))) next.Email = "Dit lijkt geen geldig e-mailadres.";
		if (!value("Onderwerp")) next.Onderwerp = "Vul een onderwerp in.";
		if (value("Bericht").length < 10) next.Bericht = "Vul een bericht van minimaal 10 tekens in.";
		setErrors(next);
		if (Object.keys(next).length) {
			setOpened(false);
			return;
		}
		const subject = value("Onderwerp");
		const body = [
			`Naam: ${value("Naam")}`,
			`Email: ${value("Email")}`,
			`Mobiel: ${value("Mobiel")}`,
			"",
			value("Bericht")
		].join("\n");
		window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		setOpened(true);
	};
	return /* @__PURE__ */ jsxs("form", {
		onSubmit,
		noValidate: true,
		className: "mt-8",
		children: [
			/* @__PURE__ */ jsxs(FieldGroup, {
				className: "gap-5",
				children: [FIELDS.map((field) => /* @__PURE__ */ jsxs(Field, {
					"data-invalid": errors[field.name] ? true : void 0,
					children: [
						/* @__PURE__ */ jsxs(FieldLabel, {
							htmlFor: `field-${field.name}`,
							className: "text-foreground",
							children: [field.label, field.required ? null : /* @__PURE__ */ jsx("span", {
								className: "ml-1 text-muted-foreground",
								children: "(optioneel)"
							})]
						}),
						/* @__PURE__ */ jsx(Input, {
							id: `field-${field.name}`,
							name: field.name,
							type: field.type,
							required: field.required,
							maxLength: field.maxLength,
							"aria-invalid": errors[field.name] ? true : void 0,
							className: "h-11 bg-card text-base"
						}),
						/* @__PURE__ */ jsx(FieldError, { children: errors[field.name] })
					]
				}, field.name)), /* @__PURE__ */ jsxs(Field, {
					"data-invalid": errors.Bericht ? true : void 0,
					children: [
						/* @__PURE__ */ jsx(FieldLabel, {
							htmlFor: "field-Bericht",
							className: "text-foreground",
							children: "Bericht"
						}),
						/* @__PURE__ */ jsx(Textarea, {
							id: "field-Bericht",
							name: "Bericht",
							rows: 8,
							minLength: 10,
							"aria-invalid": errors.Bericht ? true : void 0,
							className: "min-h-40 bg-card text-base"
						}),
						/* @__PURE__ */ jsx(FieldError, { children: errors.Bericht })
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-7 flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "submit",
					size: "cta",
					children: "Verstuur"
				}), /* @__PURE__ */ jsxs("p", {
					className: "m-0 text-[0.875rem] text-muted-foreground",
					children: [
						"of mail direct naar",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: `mailto:${site.contact.email}`,
							className: "font-medium text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary",
							children: site.contact.email
						})
					]
				})]
			}),
			opened ? /* @__PURE__ */ jsxs("p", {
				role: "status",
				className: "mt-5 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-[0.9375rem] text-foreground",
				children: [
					"Uw e-mailprogramma is geopend met dit bericht. Komt er niets tevoorschijn, mail dan direct naar ",
					site.contact.email,
					" of bel ",
					site.contact.phone,
					"."
				]
			}) : null
		]
	});
}
//#endregion
//#region src/components/Prose.tsx
/**
* Article typography.
*
* The original ran every heading through Bootstrap's `.display-7`, so a section
* heading was set in 16px bold - the same size as body copy, just a different
* colour. That is what made the old pages read as one grey block. The scale
* below keeps the source's own emphasis (the import records which headings were
* maroon) and gives each level a size that means something.
*/
var HEADING = {
	1: "text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.12]",
	2: "text-[clamp(1.25rem,2.1vw,1.625rem)] leading-[1.25]",
	3: "text-[1.0625rem] leading-snug",
	4: "text-[1rem] leading-snug"
};
var HEADING_TAG = {
	1: "h1",
	2: "h2",
	3: "h3",
	4: "h4"
};
function Prose({ blocks }) {
	return /* @__PURE__ */ jsx("div", {
		className: "text-[1.0625rem] text-muted-foreground",
		children: blocks.map((block, index) => /* @__PURE__ */ jsx(Block, { block }, index))
	});
}
function Block({ block }) {
	switch (block.t) {
		case "heading": {
			const Tag = HEADING_TAG[block.level];
			return /* @__PURE__ */ jsx(Tag, {
				className: cn$1(HEADING[block.level], block.strong ? "font-semibold" : "font-medium", block.accent ? "text-primary" : "text-foreground", block.align === "center" && "text-center", block.level === 1 ? "mt-0 mb-4" : "mt-10 mb-3 first:mt-0"),
				style: block.size ? { fontSize: `${block.size}rem` } : void 0,
				children: /* @__PURE__ */ jsx(Inlines, { nodes: block.c })
			});
		}
		case "paragraph": return /* @__PURE__ */ jsx("p", {
			className: cn$1("mb-4 leading-[1.7]", block.align === "center" && "text-center"),
			children: /* @__PURE__ */ jsx(Inlines, { nodes: block.c })
		});
		case "list": return /* @__PURE__ */ jsx("ul", {
			className: "my-4 list-disc space-y-2 pl-5 marker:text-primary/45",
			children: block.c.map((item, index) => /* @__PURE__ */ jsx("li", {
				className: "leading-[1.7] pl-1",
				children: /* @__PURE__ */ jsx(Inlines, { nodes: item })
			}, index))
		});
		case "divider": return /* @__PURE__ */ jsx(Separator$1, {
			className: cn$1("my-9", block.accent ? "bg-primary/25" : "bg-border"),
			"aria-hidden": "true"
		});
		case "contactForm": return /* @__PURE__ */ jsx(ContactForm, {});
	}
}
//#endregion
//#region src/components/ui/card.tsx
function Card({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card",
		"data-size": size,
		className: cn("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-header",
		className: cn("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-content",
		className: cn("px-(--card-spacing)", className),
		...props
	});
}
//#endregion
//#region src/components/ServiceCards.tsx
/**
* The four service panels from the homepage. Stock Card, one link per panel so
* the whole card is a target, and a 1/2/4 grid: the original laid four
* `col-lg-4` cards in a row that did not wrap and overflowed the viewport.
*/
function ServiceCards({ cards }) {
	return /* @__PURE__ */ jsx("div", {
		className: pageShell,
		children: /* @__PURE__ */ jsx("ul", {
			className: "grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4",
			children: cards.map((card) => /* @__PURE__ */ jsx("li", {
				className: "flex",
				children: /* @__PURE__ */ jsx(Link, {
					to: card.href,
					className: "group/card flex w-full rounded-xl focus-visible:outline-none",
					children: /* @__PURE__ */ jsxs(Card, {
						className: "h-full w-full transition-colors group-hover/card:ring-primary/40 group-focus-visible/card:ring-primary",
						children: [/* @__PURE__ */ jsxs(CardHeader, {
							className: "gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "flex size-11 items-center justify-center rounded-lg bg-primary/8 text-primary ring-1 ring-primary/12",
									children: /* @__PURE__ */ jsx(Icon, {
										name: card.icon,
										className: "size-6"
									})
								}), /* @__PURE__ */ jsx(ArrowUpRight, {
									className: "mt-0.5 size-4 text-muted-foreground",
									"aria-hidden": "true"
								})]
							}), /* @__PURE__ */ jsx("h3", {
								className: "font-heading text-[1.0625rem] leading-snug font-semibold",
								children: card.title
							})]
						}), /* @__PURE__ */ jsxs(CardContent, {
							className: "flex flex-1 flex-col gap-4 text-muted-foreground",
							children: [/* @__PURE__ */ jsx("p", {
								className: "leading-relaxed",
								children: /* @__PURE__ */ jsx(Inlines, { nodes: card.lead })
							}), /* @__PURE__ */ jsx("ul", {
								className: "mt-auto space-y-1.5 border-t pt-3 text-[0.9375rem]",
								children: card.items.map((item) => /* @__PURE__ */ jsxs("li", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										className: "mt-2 size-1 shrink-0 rounded-full bg-primary/45"
									}), item]
								}, item))
							})]
						})]
					})
				})
			}, card.href))
		})
	});
}
//#endregion
//#region src/components/Testimonials.tsx
/**
* Client quotes on the photo band. Three stock cards in a column, measured so
* the quote is readable over the picture; the quotation marks belong to the
* component, so the imported text arrives without them.
*/
function Testimonials({ items }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative isolate overflow-hidden bg-ink",
		children: [
			/* @__PURE__ */ jsx("img", {
				src: "/media/city.webp",
				alt: "",
				"aria-hidden": "true",
				loading: "lazy",
				className: "absolute inset-0 -z-20 size-full object-cover object-center"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 -z-10 bg-ink/80",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("div", {
				className: pageShell,
				children: /* @__PURE__ */ jsx("ul", {
					className: "mx-auto flex max-w-2xl list-none flex-col gap-5 p-0",
					children: items.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
						className: "flex flex-col gap-4",
						children: [/* @__PURE__ */ jsxs("blockquote", {
							className: "text-[1.0625rem] leading-[1.7] text-pretty",
							children: [
								"“",
								item.quote,
								"”"
							]
						}), /* @__PURE__ */ jsxs("figcaption", {
							className: "flex flex-col border-t pt-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-heading font-semibold",
								children: item.name
							}), /* @__PURE__ */ jsx("span", {
								className: "text-sm text-muted-foreground",
								children: item.role
							})]
						})]
					}) }) }, item.name))
				})
			})
		]
	});
}
//#endregion
//#region src/components/Section.tsx
/**
* The four kinds of band the imported pages are built from, in the order the
* source put them: a statement, the services, the client quotes, the article.
*/
function Section({ section }) {
	switch (section.t) {
		case "banner": return /* @__PURE__ */ jsx("section", {
			className: "border-b border-border/70",
			children: /* @__PURE__ */ jsx("div", {
				className: cn$1(pageShell, "py-12 sm:py-16"),
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-4xl items-center gap-5 sm:gap-8",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "hidden h-px flex-1 bg-border sm:block",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "font-heading text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.2] font-medium tracking-[-0.015em] text-foreground text-balance",
							children: section.heading
						}),
						/* @__PURE__ */ jsx("span", {
							className: "hidden h-px flex-1 bg-border sm:block",
							"aria-hidden": "true"
						})
					]
				})
			})
		});
		case "services": return /* @__PURE__ */ jsx("section", {
			id: "diensten",
			className: cn$1("bg-secondary", bandPadding),
			children: /* @__PURE__ */ jsx(ServiceCards, { cards: section.cards })
		});
		case "testimonials": return /* @__PURE__ */ jsx("section", {
			className: cn$1("bg-ink", bandPadding),
			children: /* @__PURE__ */ jsx(Testimonials, { items: section.items })
		});
		case "prose": return /* @__PURE__ */ jsx("section", {
			className: cn$1("bg-background", bandPadding),
			children: /* @__PURE__ */ jsx("div", {
				className: pageShell,
				children: /* @__PURE__ */ jsx("article", {
					className: cn$1("mx-auto w-full", section.width === "wide" ? "max-w-[60rem]" : "max-w-measure"),
					children: /* @__PURE__ */ jsx(Prose, { blocks: section.blocks })
				})
			})
		});
	}
}
/** Renders a whole page body, i.e. everything between the header band and the footer. */
function Sections({ sections }) {
	return /* @__PURE__ */ jsx(Fragment, { children: sections.map((section, index) => /* @__PURE__ */ jsx(Section, { section }, index)) });
}
//#endregion
//#region src/components/SiteFooter.tsx
/**
* Footer on the brand's darkest tone, which also gives every page an end.
*
* The four columns are the original's (address, contact, info, the links the
* client curates) - the imported content decides what is in them, including the
* mailto: address that the old site hid behind Cloudflare's email obfuscation.
*/
function SiteFooter() {
	return /* @__PURE__ */ jsx("footer", {
		className: "bg-ink text-ink-foreground",
		children: /* @__PURE__ */ jsxs("div", {
			className: pageShell,
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 gap-x-8 gap-y-10 py-16 sm:grid-cols-2 lg:grid-cols-4",
					children: site.columns.map((column) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "text-[0.75rem] font-semibold tracking-[0.14em] text-ink-muted uppercase",
						children: column.title
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-4 space-y-1 text-[0.9375rem] leading-relaxed",
						children: column.lines.map((line, index) => /* @__PURE__ */ jsx("p", {
							className: "m-0",
							children: /* @__PURE__ */ jsx(Inlines, {
								nodes: line,
								linkClassName: "text-ink-foreground/85 underline decoration-ink-foreground/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
							})
						}, index))
					})] }, column.title))
				}),
				/* @__PURE__ */ jsx(Separator$1, { className: "bg-white/12" }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col-reverse items-start justify-between gap-6 py-7 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "m-0 text-[0.875rem] text-ink-muted",
						children: "By Mike T."
					}), /* @__PURE__ */ jsx("ul", {
						className: "m-0 flex list-none gap-2 p-0",
						children: site.social.map((social) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: social.href,
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": social.name,
							className: "flex size-9 items-center justify-center rounded-md text-ink-muted ring-1 ring-white/12 transition-colors hover:bg-white/8 hover:text-white",
							children: /* @__PURE__ */ jsx(Icon, {
								name: social.name,
								className: "size-4"
							})
						}) }, social.name))
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/ui/sheet.tsx
function Sheet({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Root, {
		"data-slot": "sheet",
		...props
	});
}
function SheetTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Trigger, {
		"data-slot": "sheet-trigger",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Portal, {
		"data-slot": "sheet-portal",
		...props
	});
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Overlay, {
		"data-slot": "sheet-overlay",
		className: cn("fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
	return /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(Dialog.Content, {
		"data-slot": "sheet-content",
		"data-side": side,
		className: cn("fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ jsx(Dialog.Close, {
			"data-slot": "sheet-close",
			asChild: true,
			children: /* @__PURE__ */ jsxs(Button, {
				variant: "ghost",
				className: "absolute top-3 right-3",
				size: "icon-sm",
				children: [/* @__PURE__ */ jsx(XIcon, {}), /* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: "Close"
				})]
			})
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sheet-header",
		className: cn("flex flex-col gap-0.5 p-4", className),
		...props
	});
}
function SheetFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sheet-footer",
		className: cn("mt-auto flex flex-col gap-2 p-4", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Title, {
		"data-slot": "sheet-title",
		className: cn("font-heading text-base font-medium text-foreground", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Description, {
		"data-slot": "sheet-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
//#endregion
//#region src/components/SiteHeader.tsx
/**
* Stock shadcn chrome: a sticky bar with a blur and a hairline, ghost buttons
* for the menu, and a Sheet for small screens. The only custom part is that the
* Contact entry is filled rather than ghost, because it is the action the page
* wants from a visitor.
*/
function SiteHeader() {
	const [open, setOpen] = useState(false);
	const { pathname } = useLocation();
	useEffect(() => setOpen(false), [pathname]);
	const contact = site.nav.find((item) => item.href === "/contact.html");
	const links = site.nav.filter((item) => item !== contact);
	return /* @__PURE__ */ jsx("header", {
		className: "sticky top-0 z-50 bg-background/80 backdrop-blur-md",
		children: /* @__PURE__ */ jsx("div", {
			className: pageShell,
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex h-16 items-center gap-1",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "mr-3 font-heading text-[0.9375rem] font-semibold tracking-[0.1em] text-foreground",
						children: site.brand
					}),
					/* @__PURE__ */ jsxs("nav", {
						"aria-label": "Hoofdmenu",
						className: "ml-auto hidden items-center gap-1 md:flex",
						children: [links.map((item) => /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "ghost",
							children: /* @__PURE__ */ jsx(Link, {
								to: item.href,
								children: item.label
							})
						}, item.href)), contact ? /* @__PURE__ */ jsx(Button, {
							asChild: true,
							className: "ml-2",
							children: /* @__PURE__ */ jsx(Link, {
								to: contact.href,
								children: contact.label
							})
						}, contact.href) : null]
					}),
					/* @__PURE__ */ jsxs(Sheet, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ jsx(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsx(Button, {
								variant: "ghost",
								size: "icon",
								className: "ml-auto md:hidden",
								"aria-label": "Menu",
								children: /* @__PURE__ */ jsx(Menu, {})
							})
						}), /* @__PURE__ */ jsxs(SheetContent, {
							side: "right",
							children: [
								/* @__PURE__ */ jsxs(SheetHeader, { children: [/* @__PURE__ */ jsx(SheetTitle, {
									className: "tracking-[0.1em]",
									children: site.brand
								}), /* @__PURE__ */ jsx(SheetDescription, {
									className: "sr-only",
									children: "Hoofdmenu"
								})] }),
								/* @__PURE__ */ jsx("nav", {
									"aria-label": "Hoofdmenu",
									className: "grid gap-1 px-4",
									children: links.map((item) => /* @__PURE__ */ jsx(Button, {
										asChild: true,
										variant: "ghost",
										className: "h-10 justify-start px-3 text-base font-medium",
										children: /* @__PURE__ */ jsx(Link, {
											to: item.href,
											children: item.label
										})
									}, item.href))
								}),
								contact ? /* @__PURE__ */ jsxs(SheetFooter, {
									className: "gap-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "grid gap-1",
										children: [/* @__PURE__ */ jsx(Button, {
											asChild: true,
											variant: "ghost",
											className: "h-10 justify-start px-3 font-medium",
											children: /* @__PURE__ */ jsxs("a", {
												href: site.contact.phoneHref,
												children: [/* @__PURE__ */ jsx(Phone, {}), site.contact.phone]
											})
										}), /* @__PURE__ */ jsx(Button, {
											asChild: true,
											variant: "ghost",
											className: "h-10 justify-start px-3 font-medium",
											children: /* @__PURE__ */ jsxs("a", {
												href: `mailto:${site.contact.email}`,
												children: [/* @__PURE__ */ jsx(Mail, {}), site.contact.email]
											})
										})]
									}), /* @__PURE__ */ jsx(Button, {
										asChild: true,
										size: "cta",
										children: /* @__PURE__ */ jsx(Link, {
											to: contact.href,
											children: contact.label
										})
									})]
								}) : null
							]
						})]
					})
				]
			})
		})
	});
}
//#endregion
//#region src/lib/seo.ts
/**
* The domain this site will live on, used for canonicals, Open Graph URLs and
* structured data. The preview host is noindex, so these only start doing work
* when the site moves to the client's own domain - but they have to be right
* *before* the move, not after.
*/
var ORIGIN = site.canonicalOrigin;
var canonicalFor = (path) => path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`;
var OG_IMAGE = `${ORIGIN}/media/og.jpg`;
/**
* Q&A pairs a page shows, for FAQPage markup.
*
* Strict on purpose: only a heading that says "veelgestelde vragen" followed by
* a list, whose items start with a bold sentence ending in a question mark.
* Anything that does not match that shape is skipped rather than guessed at -
* marking up something that is not a question gets the page penalised.
*/
function faqsFor(page) {
	const faqs = [];
	for (const section of page.sections) {
		if (section.t !== "prose") continue;
		section.blocks.forEach((block, index) => {
			if (block.t !== "heading") return;
			const heading = block.c.map((node) => "v" in node ? node.v : "").join("");
			if (!/veelgestelde\s+vragen|^faq/i.test(heading)) return;
			const next = section.blocks[index + 1];
			if (next?.t !== "list") return;
			for (const item of next.c) {
				const [first, ...rest] = item;
				if (first?.t !== "span" || !first.marks.includes("strong")) continue;
				const question = first.c.map((node) => "v" in node ? node.v : "").join("").trim();
				const answer = rest.map((node) => "v" in node ? node.v : "").join("").trim();
				if (!question.endsWith("?") || answer.length < 20) continue;
				faqs.push({
					question,
					answer: answer.replace(/^:\s*/, "")
				});
			}
		});
	}
	return faqs;
}
/**
* One `@graph` per page: the business, the page itself, where it sits in the
* site, and its questions if it has any. Everything here comes from the import -
* no opening hours, prices or ratings are claimed, because nobody has told us
* what they are.
*/
function structuredDataFor(page) {
	const graph = [{
		"@type": "AccountingService",
		"@id": `${ORIGIN}/#organisatie`,
		name: site.brand,
		url: `${ORIGIN}/`,
		email: site.contact.email,
		telephone: `+31${site.contact.phoneHref.replace(/^tel:0?/, "")}`,
		address: {
			"@type": "PostalAddress",
			streetAddress: site.contact.street,
			postalCode: site.contact.postalCode,
			addressLocality: site.contact.city,
			addressCountry: "NL"
		},
		areaServed: {
			"@type": "City",
			name: site.contact.city
		},
		sameAs: site.social.map((profile) => profile.href),
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Diensten",
			itemListElement: page.sections.filter((section) => section.t === "services").flatMap((section) => section.cards.map((card) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: card.title,
					description: card.lead.map((node) => "v" in node ? node.v : "").join(""),
					url: canonicalFor(card.href)
				}
			})))
		}
	}, {
		"@type": "WebPage",
		"@id": canonicalFor(page.path),
		url: canonicalFor(page.path),
		name: page.title,
		description: page.description || void 0,
		inLanguage: "nl-NL",
		isPartOf: {
			"@type": "WebSite",
			"@id": `${ORIGIN}/#website`,
			name: site.brand,
			url: `${ORIGIN}/`
		},
		about: { "@id": `${ORIGIN}/#organisatie` }
	}];
	const crumbs = crumbsFor(page.path).filter((crumb) => crumb.label !== site.brand || crumb.href === "/");
	if (page.path !== "/" && crumbs.length > 1) graph.push({
		"@type": "BreadcrumbList",
		itemListElement: crumbs.map((crumb, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: crumb.label,
			item: canonicalFor(crumb.href)
		}))
	});
	const faqs = faqsFor(page);
	if (faqs.length) graph.push({
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer
			}
		}))
	});
	return {
		"@context": "https://schema.org",
		"@graph": graph
	};
}
//#endregion
//#region src/components/PageMeta.tsx
/**
* Everything that belongs in `<head>` for one page.
*
* Rendered as part of the tree, not set with an effect: React 19 hoists these
* into the document head while rendering, so the prerendered HTML that a
* crawler receives already carries the right title, canonical and structured
* data - and the same code keeps them correct during client-side navigation.
*/
function PageMeta({ page }) {
	const url = canonicalFor(page.path);
	const image = page.path === "/" ? OG_IMAGE : `${ORIGIN}/media/denker.avif`;
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("title", { children: page.title }),
		page.description ? /* @__PURE__ */ jsx("meta", {
			name: "description",
			content: page.description
		}) : null,
		/* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: url
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: "website"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:site_name",
			content: site.brand
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:locale",
			content: "nl_NL"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: page.title
		}),
		page.description ? /* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: page.description
		}) : null,
		/* @__PURE__ */ jsx("meta", {
			property: "og:url",
			content: url
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image",
			content: image
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image:width",
			content: "1200"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image:height",
			content: "630"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:card",
			content: "summary_large_image"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:title",
			content: page.title
		}),
		page.description ? /* @__PURE__ */ jsx("meta", {
			name: "twitter:description",
			content: page.description
		}) : null,
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:image",
			content: image
		}),
		/* @__PURE__ */ jsx("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: JSON.stringify(structuredDataFor(page)) }
		})
	] });
}
//#endregion
//#region src/App.tsx
function App() {
	const { pathname } = useLocation();
	const metaPage = pagesByPath[pathname] ?? notFoundPage;
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageMeta, { page: metaPage }),
		/* @__PURE__ */ jsx(ScrollToTop, {}),
		/* @__PURE__ */ jsx(SiteHeader, {}),
		/* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs(Routes, { children: [
			pages.map((page) => /* @__PURE__ */ jsx(Route, {
				path: page.path,
				element: /* @__PURE__ */ jsx(PageView, { page })
			}, page.id)),
			/* @__PURE__ */ jsx(Route, {
				path: "/index.html",
				element: /* @__PURE__ */ jsx(Shortlink, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "*",
				element: /* @__PURE__ */ jsx(NotFound, {})
			})
		] }) }),
		/* @__PURE__ */ jsx(SiteFooter, {})
	] });
}
/** The original never kept the scroll position across page loads. */
function ScrollToTop() {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return null;
}
function PageView({ page }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [page.path === "/" ? /* @__PURE__ */ jsx(Hero, {}) : /* @__PURE__ */ jsx(PageHeader, { page }), /* @__PURE__ */ jsx(Sections, { sections: page.sections })] });
}
function Shortlink() {
	const [params] = useSearchParams();
	const target = pathByWpId[params.get("p") ?? ""] ?? homePage.path;
	return /* @__PURE__ */ jsx(Navigate, { to: target });
}
function NotFound() {
	const crumbs = crumbsFor("/");
	return /* @__PURE__ */ jsx("section", {
		className: "bg-background py-20 sm:py-28",
		children: /* @__PURE__ */ jsx("div", {
			className: cn$1(pageShell, "flex justify-center"),
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-measure",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "m-0 text-[0.75rem] font-semibold tracking-[0.14em] text-primary uppercase",
						children: "404"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-3 font-heading text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-foreground",
						children: "Pagina niet gevonden"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 leading-[1.7] text-muted-foreground",
						children: "Deze pagina bestaat niet of is verplaatst. Ga terug naar de homepage of stuur een bericht via het contactformulier."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "cta",
							children: /* @__PURE__ */ jsx(Link, {
								to: crumbs[0].href,
								children: "Terug naar de homepage"
							})
						}), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "cta",
							variant: "outline",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/contact.html",
								children: "Neem contact op"
							})
						})]
					})
				]
			})
		})
	});
}
//#endregion
//#region src/entry-server.tsx
/**
* Renders one route to a complete HTML document, for scripts/prerender.mjs.
*
* The document is rendered whole, so React 19 can hoist the page's title, meta
* tags and structured data into the head while rendering - which is the point:
* a crawler that never runs JavaScript still gets the finished page.
*
* `headTags` and `bodyTags` are the hashed asset tags from the client build
* (stylesheet, module script, module preloads); they are passed in as elements
* because only the build knows their names.
*/
async function render(path, tags = {}) {
	const stream = new PassThrough();
	let html = "";
	stream.on("data", (chunk) => {
		html += chunk.toString();
	});
	await new Promise((resolve, reject) => {
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsxs("html", {
			lang: "nl",
			children: [/* @__PURE__ */ jsxs("head", { children: [
				/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
				/* @__PURE__ */ jsx("meta", {
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				}),
				/* @__PURE__ */ jsx("meta", {
					name: "color-scheme",
					content: "light"
				}),
				/* @__PURE__ */ jsx("meta", {
					name: "theme-color",
					content: "#800000"
				}),
				/* @__PURE__ */ jsx("link", {
					rel: "icon",
					href: "/favicon-32.png",
					sizes: "32x32"
				}),
				/* @__PURE__ */ jsx("link", {
					rel: "apple-touch-icon",
					href: "/apple-touch-icon.png"
				}),
				tags.head
			] }), /* @__PURE__ */ jsxs("body", { children: [/* @__PURE__ */ jsx("div", {
				id: "root",
				children: /* @__PURE__ */ jsx(StaticRouter, {
					location: path,
					children: /* @__PURE__ */ jsx(App, {})
				})
			}), tags.body] })]
		}), {
			onAllReady: () => {
				pipe(stream);
				stream.on("end", resolve);
			},
			onError: reject
		});
		setTimeout(() => {
			abort();
			reject(/* @__PURE__ */ new Error(`prerender timed out for ${path}`));
		}, 15e3);
	});
	return `<!doctype html>${html}`;
}
//#endregion
export { render };
