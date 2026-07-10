<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title><xsl:value-of select="/rss/channel/title" /> — RSS</title>
        <style>
          :root { color-scheme: light dark; }
          body {
            font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
            max-width: 40rem; margin: 0 auto; padding: 3rem 1.25rem;
            line-height: 1.6; color: #22201c; background: #fbfaf8;
          }
          @media (prefers-color-scheme: dark) {
            body { color: #e9e5dd; background: #1a1917; }
            a { color: #8aa6f0; }
            .card { border-color: #322f2b; }
          }
          h1 { font-size: 1.6rem; letter-spacing: -0.02em; }
          .note {
            background: #e9eefb; color: #244cad; padding: 0.75rem 1rem;
            border-radius: 0.5rem; font-size: 0.9rem; margin: 1.5rem 0;
          }
          a { color: #2f5fd0; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .card { border: 1px solid #e7e3da; border-radius: 0.75rem; padding: 1.25rem; margin: 0.75rem 0; }
          .card h2 { margin: 0 0 0.25rem; font-size: 1.1rem; }
          .date { font-size: 0.8rem; opacity: 0.65; }
          .desc { margin: 0.5rem 0 0; opacity: 0.8; font-size: 0.95rem; }
        </style>
      </head>
      <body>
        <p class="note">
          This is an RSS feed. Copy the URL into a feed reader to subscribe.
        </p>
        <h1><xsl:value-of select="/rss/channel/title" /></h1>
        <p><xsl:value-of select="/rss/channel/description" /></p>
        <xsl:for-each select="/rss/channel/item">
          <div class="card">
            <h2>
              <a href="{link}"><xsl:value-of select="title" /></a>
            </h2>
            <div class="date"><xsl:value-of select="pubDate" /></div>
            <p class="desc"><xsl:value-of select="description" /></p>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
