import { Image, Typography } from "antd"
import htmlParser from "html-react-parser"
import { openGlossaryModal } from "../components/Glossary/GlossaryModal"

export const parseHtml = (htmlString: string) =>
  htmlParser(htmlString, {
    replace: (node) => {
      if (node.type == "tag") {
        let current: any = node
        switch (node["name"]) {
          case "img":
            current = <Image src={node["attribs"]["src"]} />
            break
          case "span":
            if (
              node["attribs"] &&
              node["attribs"]["data-origin"] == "glossary-entry-word"
            ) {
              const text = (node["children"] || [])
                .filter((v) => typeof v.data == "string")
                .reduce((v, c) => (v += c.data), "")
              const uuid = node["attribs"]["id"]
              current = (
                <Typography.Text
                  style={{ borderBottom: "dashed 1px #333", cursor: "pointer" }}
                  onClick={() => openGlossaryModal(uuid)}
                >
                  {text}
                </Typography.Text>
              )
            }
            break
        }
        return current
      }
      return node
    },
  })
