'use client'

import { PowerBIEmbed } from 'powerbi-client-react'

type embedConfig = {
  reportid: string
  embedUrl: string
  accessToken: string
}

export default function PowerBiComponent({
  token,
  groupid,
  reportid
}: {
  token: embedConfig
  groupid: string
  reportid: string
}) {
  console.log({
    type: 'report', // Supported types: report, dashboard, tile, visual, qna, paginated report and create
    id: reportid,
    embedUrl: token.embedUrl,
    accessToken: token.accessToken,
    tokenType: 1, // Use models.TokenType.Aad for SaaS embed
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: false
        }
      },
      background: 1
    }
  })

  return (
    <PowerBIEmbed
      embedConfig={{
        type: 'report', // Supported types: report, dashboard, tile, visual, qna, paginated report and create
        id: reportid,
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportid}&groupId=${groupid}`,
        accessToken: token.accessToken,
        tokenType: 0, // Use models.TokenType.Aad for SaaS embed
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: false
            }
          },
          background: 1
        }
      }}
    />
  )
}
