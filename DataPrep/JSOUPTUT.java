import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by zemoso on 22/8/17.
 * @author dharmraj
 */
public class JSOUPTUT {
    private static final String commaSeprator=",";
    private static final String newLineSeprator="\n";

    /**
     *
     * @param fileWriter write object
     * @param dpt department to be written from the input html file
     * @param code code from the input html file
     * @param description description from the input html file
     * @param rate rate from the input html file
     * @return true if this function is called
     */
    public static boolean csvWriter(FileWriter fileWriter,String dpt,String code,String
            description,String rate){
        try{
            /*Writing in the file*/
            fileWriter.append(dpt);
            fileWriter.append(commaSeprator);
            fileWriter.append(code);
            fileWriter.append(commaSeprator);
            fileWriter.append(description);
            fileWriter.append(commaSeprator);
            fileWriter.append(rate);
            fileWriter.append(newLineSeprator);

        }catch (IOException e){
            e.printStackTrace();
        }
        return true;
    }

    /*Main method of the class*/
    public static void main(String[] args){
        String departments="";
        String code="";
        String rate="";
        String description="";
        File file=new File("Detaprep.csv");
        FileWriter fileWriter=null;
        String department = "DEPARTMENT OF+";
        Here:
        try {
            fileWriter=new FileWriter(file);
            /* Appending the Header in the file*/
            fileWriter.append("Department");
            fileWriter.append(commaSeprator);
            fileWriter.append("Code");
            fileWriter.append(commaSeprator);
            fileWriter.append("Description");
            fileWriter.append(commaSeprator);
            fileWriter.append("rate");
            fileWriter.append(newLineSeprator);
            String webpage = "http://dme.ap.nic.in/ma/nims.html";
            Document firstHTML = Jsoup.connect(webpage).get();                                       /* conection to the webpage and get the html Dom*/
            org.jsoup.select.Elements els = firstHTML.getElementsByClass("MsoPlainText");  /*All the data defined in MsoPlainText Class*/
            for (Element el : els) {                                                                /*Iterate through each element which is row*/
                boolean functionCall=false;
                String str = el.text();
                str = str.replace("\u00a0", "");                            /*removing &nbsp 'non breakable space'*/
                str=str.trim();
                if (str.matches("NIMS.*")) {
                    continue;
                }

                Pattern pattern = Pattern.compile(department);
                Matcher matcher = pattern.matcher(str);
                int firstSpace = 0;
                int lastSpace;
                if (str.length() != 0 && !str.matches("--.*") && !str.matches("=.*") && !str.matches("CODE.*")) {
                    if (str.matches(".*ACCOMMODATION CHARGES.*")) {
                        break Here;
                    }
                    if (matcher.find()) {
                        System.out.print("" + str);
                        departments = str;                                                             /*Got the Department*/
                        continue;
                    }
                    int i = 0;
                    while (i < str.length() - 1 && !str.matches("DEPARTMENT OF.*")) {
                        i++;
                        if (str.charAt(i) == ' ') {
                            System.out.print("  " + str.substring(0, i));
                            code = str.substring(0, i);                                              /* Got the code*/
                            firstSpace = i;
                            functionCall=true;
                            break;
                        }
                    }
                    if (!str.matches("DEPARTMENT OF.*") && firstSpace < str.length() - 1) {
                        lastSpace = str.lastIndexOf(" ");
                        System.out.print(str.substring(firstSpace,lastSpace+1));
                        description='"'+str.substring(firstSpace,lastSpace+1)+'"';                  /*Got the description*/
                        rate = str.substring(str.lastIndexOf(" ") + 1);                              /*Got the rate*/
                        System.out.print("|" + rate + "|" + "\n");
                        functionCall=true;
                    }
                }if(!rate.matches("") && !description.matches("")){                                /*If rate and description not empty function will be called to write all four values in csv file*/
                    boolean called= functionCall==true?csvWriter(fileWriter,departments,code,description,rate):false;
                 }
            }
        }catch (IOException e){
            e.printStackTrace();
        }finally {
            try{
                fileWriter.close();
            }catch(IOException ex){
                ex.printStackTrace();
            }
        }
    }
}
