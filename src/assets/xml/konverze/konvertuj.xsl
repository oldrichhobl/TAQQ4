<?xml version="1.0" ?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >

<xsl:output method="xml" indent = "yes"  encoding="Windows-1250" /> 

 <xsl:template match="/">

          <xsl:apply-templates/>

 </xsl:template>

 <xsl:template match="tr">  <!-- jedna radka  <R w="KA"   s="ka"   tc="KA"   >&#x0F40;</R> -->
 <R> 
    <xsl:attribute name="w">
           <xsl:value-of select="td[5]"/>
    </xsl:attribute>
    <xsl:attribute name="s">
           <xsl:value-of select="'yy'"/>
    </xsl:attribute>
    <xsl:attribute name="tc">
           <xsl:value-of select="'xx'"/>
    </xsl:attribute>

    <xsl:value-of select="td[3]"/> 
 </R>
</xsl:template>				  

<!-- tabulka INFO -->

</xsl:stylesheet>
