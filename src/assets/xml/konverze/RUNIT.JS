//**************************************************
//  TEST UPRAVY XSL SOUBORU
//  PRED JEHO POUZITIM  KU KONVERZI
//  NAPRIKLAD NAJDEME definici style a zmenima barvy
//
//******************************************************
var xml = new ActiveXObject("Msxml2.DOMDocument.6.0");
var xsl = new ActiveXObject("Msxml2.DOMDocument.6.0");

xml.async = false;
xsl.async = false;

xml.load("utf8Vse.xml");
xsl.load("konvertuj.xsl");

// je treba nastavit prislusne jmenne prostory
// presne stejne jako v showx.xsl !
  xsl.setProperty("SelectionLanguage", "XPath");
//  xsl.setProperty("SelectionNamespaces",
//	  "xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:def='http://www.w3.org/TR/REC-html40'" )

  // pokus na obycejnem xml bez jmennych prostoru
  // var idstyle = xml.selectSingleNode("//TH");
  //  WScript.Echo("TH = " + idstyle.text);

  // vyhledame druhou definici stylu, ktera obsahuje definici barev
  //var style = xsl.selectSingleNode("//def:style[2]");
  
  WScript.Echo("Xsl = " + xsl.xml);



var fso = new ActiveXObject("Scripting.FileSystemObject");
var MyFile = fso.CreateTextFile("output.xml", true);
var result = xml.transformNode(xsl);
WScript.Echo("result = " + result);

// result.save("outputsave.xml");

 MyFile.Write(result);
// MyFile.Write(xml.transformNode(xsl));

MyFile.Close();


