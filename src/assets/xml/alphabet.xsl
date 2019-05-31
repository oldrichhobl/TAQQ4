<?xml version="1.0" encoding="utf-8"  ?> 
<xsl:stylesheet   version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>
<xsl:output method="xml" encoding="utf-8" /> 

<xsl:param name = "param1" >Neni Parametr </xsl:param>

<xsl:variable name="today" select="//ORIGIN/DATE" />

 <!--                 nezobrazovane udaje                 -->
<xsl:template match="text()"/>
 
	 
 <xsl:template match="/">
  <xsl:for-each select="//RECS[@name=$param1]/R">  
   <div>
    <xsl:attribute name="onClick" >
      <xsl:text>sayLetter('</xsl:text>
      <xsl:value-of select="./@s"/>
      <xsl:text>');</xsl:text>
    </xsl:attribute>  

    <xsl:value-of select="."/> <!-- &#x0F0B;  -->
    <div><xsl:value-of select="./@w"/></div>
   </div>

  </xsl:for-each>
 

</xsl:template>


 </xsl:stylesheet>
