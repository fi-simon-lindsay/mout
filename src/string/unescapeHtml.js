define([], function () {

    var IS_DECIMAL = /^#[0-9]+$/,
        IS_HEX = /^#[xX][0-9A-Fa-f]+$/;

    var HTML_ENTITIES = {};
    HTML_ENTITIES['38'] = '&amp;';
    HTML_ENTITIES['160'] = '&nbsp;';
    HTML_ENTITIES['161'] = '&iexcl;';
    HTML_ENTITIES['162'] = '&cent;';
    HTML_ENTITIES['163'] = '&pound;';
    HTML_ENTITIES['164'] = '&curren;';
    HTML_ENTITIES['165'] = '&yen;';
    HTML_ENTITIES['166'] = '&brvbar;';
    HTML_ENTITIES['167'] = '&sect;';
    HTML_ENTITIES['168'] = '&uml;';
    HTML_ENTITIES['169'] = '&copy;';
    HTML_ENTITIES['170'] = '&ordf;';
    HTML_ENTITIES['171'] = '&laquo;';
    HTML_ENTITIES['172'] = '&not;';
    HTML_ENTITIES['173'] = '&shy;';
    HTML_ENTITIES['174'] = '&reg;';
    HTML_ENTITIES['175'] = '&macr;';
    HTML_ENTITIES['176'] = '&deg;';
    HTML_ENTITIES['177'] = '&plusmn;';
    HTML_ENTITIES['178'] = '&sup2;';
    HTML_ENTITIES['179'] = '&sup3;';
    HTML_ENTITIES['180'] = '&acute;';
    HTML_ENTITIES['181'] = '&micro;';
    HTML_ENTITIES['182'] = '&para;';
    HTML_ENTITIES['183'] = '&middot;';
    HTML_ENTITIES['184'] = '&cedil;';
    HTML_ENTITIES['185'] = '&sup1;';
    HTML_ENTITIES['186'] = '&ordm;';
    HTML_ENTITIES['187'] = '&raquo;';
    HTML_ENTITIES['188'] = '&frac14;';
    HTML_ENTITIES['189'] = '&frac12;';
    HTML_ENTITIES['190'] = '&frac34;';
    HTML_ENTITIES['191'] = '&iquest;';
    HTML_ENTITIES['192'] = '&Agrave;';
    HTML_ENTITIES['193'] = '&Aacute;';
    HTML_ENTITIES['194'] = '&Acirc;';
    HTML_ENTITIES['195'] = '&Atilde;';
    HTML_ENTITIES['196'] = '&Auml;';
    HTML_ENTITIES['197'] = '&Aring;';
    HTML_ENTITIES['198'] = '&AElig;';
    HTML_ENTITIES['199'] = '&Ccedil;';
    HTML_ENTITIES['200'] = '&Egrave;';
    HTML_ENTITIES['201'] = '&Eacute;';
    HTML_ENTITIES['202'] = '&Ecirc;';
    HTML_ENTITIES['203'] = '&Euml;';
    HTML_ENTITIES['204'] = '&Igrave;';
    HTML_ENTITIES['205'] = '&Iacute;';
    HTML_ENTITIES['206'] = '&Icirc;';
    HTML_ENTITIES['207'] = '&Iuml;';
    HTML_ENTITIES['208'] = '&ETH;';
    HTML_ENTITIES['209'] = '&Ntilde;';
    HTML_ENTITIES['210'] = '&Ograve;';
    HTML_ENTITIES['211'] = '&Oacute;';
    HTML_ENTITIES['212'] = '&Ocirc;';
    HTML_ENTITIES['213'] = '&Otilde;';
    HTML_ENTITIES['214'] = '&Ouml;';
    HTML_ENTITIES['215'] = '&times;';
    HTML_ENTITIES['216'] = '&Oslash;';
    HTML_ENTITIES['217'] = '&Ugrave;';
    HTML_ENTITIES['218'] = '&Uacute;';
    HTML_ENTITIES['219'] = '&Ucirc;';
    HTML_ENTITIES['220'] = '&Uuml;';
    HTML_ENTITIES['221'] = '&Yacute;';
    HTML_ENTITIES['222'] = '&THORN;';
    HTML_ENTITIES['223'] = '&szlig;';
    HTML_ENTITIES['224'] = '&agrave;';
    HTML_ENTITIES['225'] = '&aacute;';
    HTML_ENTITIES['226'] = '&acirc;';
    HTML_ENTITIES['227'] = '&atilde;';
    HTML_ENTITIES['228'] = '&auml;';
    HTML_ENTITIES['229'] = '&aring;';
    HTML_ENTITIES['230'] = '&aelig;';
    HTML_ENTITIES['231'] = '&ccedil;';
    HTML_ENTITIES['232'] = '&egrave;';
    HTML_ENTITIES['233'] = '&eacute;';
    HTML_ENTITIES['234'] = '&ecirc;';
    HTML_ENTITIES['235'] = '&euml;';
    HTML_ENTITIES['236'] = '&igrave;';
    HTML_ENTITIES['237'] = '&iacute;';
    HTML_ENTITIES['238'] = '&icirc;';
    HTML_ENTITIES['239'] = '&iuml;';
    HTML_ENTITIES['240'] = '&eth;';
    HTML_ENTITIES['241'] = '&ntilde;';
    HTML_ENTITIES['242'] = '&ograve;';
    HTML_ENTITIES['243'] = '&oacute;';
    HTML_ENTITIES['244'] = '&ocirc;';
    HTML_ENTITIES['245'] = '&otilde;';
    HTML_ENTITIES['246'] = '&ouml;';
    HTML_ENTITIES['247'] = '&divide;';
    HTML_ENTITIES['248'] = '&oslash;';
    HTML_ENTITIES['249'] = '&ugrave;';
    HTML_ENTITIES['250'] = '&uacute;';
    HTML_ENTITIES['251'] = '&ucirc;';
    HTML_ENTITIES['252'] = '&uuml;';
    HTML_ENTITIES['253'] = '&yacute;';
    HTML_ENTITIES['254'] = '&thorn;';
    HTML_ENTITIES['255'] = '&yuml;';
    HTML_ENTITIES['34'] = '&quot;';
    HTML_ENTITIES['39'] = '&#39;';
    HTML_ENTITIES['60'] = '&lt;';
    HTML_ENTITIES['62'] = '&gt;';

    /**
     * Unescapes HTML special chars
     * See http://developers.whatwg.org/syntax.html#character-references for
     * the spec on character escapes.
     */
    function unescapeHtml(str){
        if (!str) {
            return '';
        }

        var i = 0,
            start = 0,
            output = '',
            end,
            escape;

        // Find all '&' characters
        while ((i = str.indexOf('&', start)) !== -1)
        {
            // Find the ending ';'
            end = str.indexOf(';', i + 1);
            if (end === -1) {
                // No more valid escapes
                break;
            }

            escape = str.substring(i + 1, end);
            output += str.substring(start, i) + unescapeChar(escape);
            start = end + 1;
        }

        if (start === 0) {
            // No escapes found
            return str;
        }

        // Add the remaining string
        output += str.substring(start, str.length);

        return output;
    }

    // This does not recognize all named characters. See
    // http://developers.whatwg.org/named-character-references.html#named-character-references
    // for the full list.
    function unescapeChar(value) {
        var targetEntity = '&'+value+';';
        for (var k in HTML_ENTITIES) {
          if (HTML_ENTITIES.hasOwnProperty(k)) {
            if (HTML_ENTITIES[k]===targetEntity) {
              return String.fromCharCode(k);
            }
          }
        }

        // test of &#039;
        if(targetEntity==="&#039;") {
            return "'";
        } else if (IS_DECIMAL.test(value)) {
            value = value.substring(1);
            return String.fromCharCode(+value);
        } else if (IS_HEX.test(value)) {
            value = value.substring(2);
            return String.fromCharCode(parseInt(value, 16));
        } else {
            // Unrecognized escape sequence
            return '&' + value + ';';
        }
    }

    return unescapeHtml;

});
