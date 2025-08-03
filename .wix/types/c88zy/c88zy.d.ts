/// <reference path="../masterPage/masterPage.d.ts" />
type PageElementsMap = MasterPageElementsMap & {
	"#page1": $w.Page;
	"#sideCartLightboxController1": $w.AppController;
	"#lightbox1": $w.HiddenCollapsedElement;
	"#sideCart1": $w.IFrame;
}