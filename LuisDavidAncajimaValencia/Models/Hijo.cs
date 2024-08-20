namespace LuisDavidAncajimaValencia.Models
{
    public class Hijo
    {
        //[Key]
        public int IdHijo { get; set; }

        //[Required]
        //[Column(TypeName = "varchar 100")]
        public string? TipoDoc { get; set; }

        //[Required]
        //[Column(TypeName = "varchar 50")]
        public string? NumeroDoc { get; set; }

        //[Required]
        //[Column(TypeName = "varchar 255")]
        public string? ApPaterno { get; set; }

        //[Required]
        //[Column(TypeName = "varchar 255")]
        public string? ApMaterno { get; set; }

        //[Required]
        //[Column(TypeName = "varchar 255")]
        public string? Nombre1 { get; set; }

        //[Required]
        //[Column(TypeName = "varchar 255")]
        public string? Nombre2 { get; set; }

        //[Required]
        public string? FechaNac { get; set; }

        //[Required]
        public int  IdPersonal { get; set; }
    }
}
