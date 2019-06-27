package service;

import static com.sun.javafx.util.Utils.split;

public class check {
    public static boolean check(String str)
    {
        String inj_str = "'|and|exec|insert|select|delete|update|count|*|%|chr|mid|master|truncate|char|declare|;|or|-|+|,";
        String inj_stra[] = split(inj_str,"|");
        for (int i=0 ; i < inj_stra.length ; i++ )
        {
            if (str.indexOf(String.valueOf(inj_stra))>=0)
            {
                return true;
            }
        }
        return false;
    }
}
