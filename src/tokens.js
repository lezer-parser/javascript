/* Hand-written tokenizers for JavaScript tokens that can't be
   expressed by lezer's built-in tokenizer. */

import {ExternalTokenizer} from "lezer"
import {insertSemi, noSemi, PostfixOp, templateContent, templateDollarBrace, templateEnd} from "./parser.terms.js"

const newline = [10, 13, 8232, 8233]
const space = [9, 11, 12, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288]

const braceR = 125, braceL = 123, semicolon = 59, slash = 47, star = 42,
      plus = 43, minus = 45, dollar = 36, backtick = 96, backslash = 92

// FIXME this should technically enter block comments
function newlineBefore(input, pos) {
  for (let i = pos - 1; i >= 0; i--) {
    let prev = input.get(i)
    if (newline.indexOf(prev) > -1) return true
    if (space.indexOf(prev) < 0) break
  }
  return false
}

export const insertSemicolon = new ExternalTokenizer((input, token, stack) => {
  let pos = token.start, next = input.get(pos)
  if ((next == braceR || next == -1 || newlineBefore(input, pos)) && stack.canShift(insertSemi))
    token.accept(insertSemi, token.start)
}, {contextual: true})

export const noSemicolon = new ExternalTokenizer((input, token, stack) => {
  let pos = token.start, next = input.get(pos++)
  if (space.indexOf(next) > -1 || newline.indexOf(next) > -1) return
  if (next == slash) {
    let after = input.get(pos++)
    if (after == slash || after == star) return
  }
  if (next != braceR && next != semicolon && next != -1 && !newlineBefore(input, token.start) &&
      stack.canShift(noSemi))
    token.accept(noSemi, token.start)
}, {contextual: true})

export const postfix = new ExternalTokenizer((input, token, stack) => {
  let pos = token.start, next = input.get(pos++)
  if ((next == plus || next == minus) && next == input.get(pos++) &&
      !newlineBefore(input, token.start) && stack.canShift(PostfixOp))
    token.accept(PostfixOp, pos)
}, {contextual: true})

export const template = new ExternalTokenizer((input, token) => {
  let pos = token.start, afterDollar = false
  for (;;) {
    let next = input.get(pos++)
    if (next < 0) {
      if (pos - 1 > token.start) token.accept(templateContent, pos - 1)
      break
    } else if (next == backtick) {
      if (pos == token.start + 1) token.accept(templateEnd, pos)
      else token.accept(templateContent, pos - 1)
      break
    } else if (next == braceL && afterDollar) {
      if (pos == token.start + 2) token.accept(templateDollarBrace, pos)
      else token.accept(templateContent, pos - 2)
      break
    } else if (next == 10 /* "\n" */ && pos > token.start + 1) {
      // Break up template strings on lines, to avoid huge tokens
      token.accept(templateContent, pos)
      break
    } else if (next == backslash && pos != input.length) {
      pos++
    }
    afterDollar = next == dollar
  }
})
