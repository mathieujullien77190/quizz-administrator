import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 6px;
  min-height: 100px;
`;

export const Editor = styled.textarea`
  flex: 1;
  min-height: 100px;
  font-size: 12px;
  font-family: monospace;
  color: #1e293b;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 8px;
  background: #fff;
  outline: none;
  resize: vertical;

  &::placeholder {
    color: #9ca3af;
    font-style: italic;
  }

  &:focus {
    border-color: #94a3b8;
  }
`;

export const Preview = styled.div`
  flex: 1;
  min-height: 100px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 1.6;
  color: #1e293b;
  background: #fafafa;
  overflow-y: auto;
  word-break: break-word;

  h1, h2, h3, h4 {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 700;
  }

  p {
    margin: 0 0 6px;
  }

  ul, ol {
    margin: 0 0 6px;
    padding-left: 16px;
  }

  li {
    margin-bottom: 2px;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  code {
    font-family: monospace;
    font-size: 11px;
    background: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
  }

  blockquote {
    margin: 0 0 6px;
    padding-left: 8px;
    border-left: 3px solid #d1d5db;
    color: #6b7280;
  }
`;
