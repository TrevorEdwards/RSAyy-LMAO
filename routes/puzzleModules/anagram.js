function anagram(s) {
    q = "";    
    while (s.length > 0) {
        i = Math.floor(Math.random() * s.length);
        q += s.charAt(i);
        s = s.substring(0,i) + s.substring(i+1);
    }
    return q;
}
