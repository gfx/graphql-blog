import React from "react";

const addressStyle: React.CSSProperties = {
  color: "gray",
  borderTop: "1px solid black",
  marginTop: 20,
  paddingTop: 20,
  textAlign: "right"
};

export function Footer(_props) {
  return (
    <address style={addressStyle}>
      Powored by https://github.com/gfx/graphql-blog.
    </address>
  );
}
