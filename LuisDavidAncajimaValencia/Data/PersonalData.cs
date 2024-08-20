using LuisDavidAncajimaValencia.Models;
using System.Data;
using System.Data.SqlClient;

namespace LuisDavidAncajimaValencia.Data
{
    public class PersonalData
    {

        private readonly string conexion;

        public PersonalData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("CadenaSql")!;
        }

        public async Task<List<Personal>> Lista()
        {
            List<Personal> lista = new List<Personal>();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_listaPersonal",con);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var  reader = await cmd.ExecuteReaderAsync()) {
                    while ( await reader.ReadAsync()) {
                        lista.Add(new Personal
                        {
                            IdPersonal = Convert.ToInt32(reader["IdPersonal"]),
                            TipoDoc = reader["TipoDoc"].ToString(),
                            NumeroDoc = reader["NumeroDoc"].ToString(),
                            ApPaterno = reader["ApPaterno"].ToString(),
                            ApMaterno = reader["ApMaterno"].ToString(),
                            Nombre1 = reader["Nombre1"].ToString(),
                            Nombre2 = reader["Nombre2"].ToString(),                       
                            FechaNac = reader["FechaNac"].ToString(),
                            FechaIngreso = reader["FechaIngreso"].ToString(),
                        });
                    }
                }
            }
            return lista;
        }

        public async Task<Personal> ObternerPersonal(int id)
        {
            Personal objeto = new Personal();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_obtenerPersonal", con);
                cmd.Parameters.AddWithValue("@IdPersonal", id);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        objeto = new Personal
                        {
                            IdPersonal = Convert.ToInt32(reader["IdPersonal"]),
                            TipoDoc = reader["TipoDoc"].ToString(),
                            NumeroDoc = reader["NumeroDoc"].ToString(),
                            ApPaterno = reader["ApPaterno"].ToString(),
                            ApMaterno = reader["ApMaterno"].ToString(),
                            Nombre1 = reader["Nombre1"].ToString(),
                            Nombre2 = reader["Nombre2"].ToString(),
                            FechaNac = reader["FechaNac"].ToString(),
                            FechaIngreso = reader["FechaIngreso"].ToString(),
                        };
                    }
                }
            }
            return objeto;
        }

        public async Task<bool> CrearPersonal(Personal personal)
        {
            bool rpta = true;

            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new SqlCommand("sp_crearPersonal", con);
                cmd.Parameters.AddWithValue("@TipoDoc", personal.TipoDoc);
                cmd.Parameters.AddWithValue("@NumeroDoc", personal.NumeroDoc);
                cmd.Parameters.AddWithValue("@ApPaterno", personal.ApPaterno);
                cmd.Parameters.AddWithValue("@ApMaterno", personal.ApMaterno);
                cmd.Parameters.AddWithValue("@Nombre1", personal.Nombre1);
                cmd.Parameters.AddWithValue("@Nombre2", personal.Nombre2);
                cmd.Parameters.AddWithValue("@FechaNac", personal.FechaNac);
                cmd.Parameters.AddWithValue("@FechaIngreso", personal.FechaIngreso);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await con.OpenAsync() ;
                    rpta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch {
                    rpta = false;
                }
            }
            return rpta;
        }

        public async Task<bool> EditarPersonal(Personal personal)
        {
            bool rpta = true;

            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new SqlCommand("sp_EditarPersonal", con);

                cmd.Parameters.AddWithValue("@IdPersonal", personal.IdPersonal);
                cmd.Parameters.AddWithValue("@TipoDoc", personal.TipoDoc);
                cmd.Parameters.AddWithValue("@NumeroDoc", personal.NumeroDoc);
                cmd.Parameters.AddWithValue("@ApPaterno", personal.ApPaterno);
                cmd.Parameters.AddWithValue("@ApMaterno", personal.ApMaterno);
                cmd.Parameters.AddWithValue("@Nombre1", personal.Nombre1);
                cmd.Parameters.AddWithValue("@Nombre2", personal.Nombre2);
                cmd.Parameters.AddWithValue("@FechaNac", personal.FechaNac);
                cmd.Parameters.AddWithValue("@FechaIngreso", personal.FechaIngreso);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await con.OpenAsync();
                    rpta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    rpta = false;
                }
            }
            return rpta;
        }

        public async Task<bool> EliminarPersonal(int id)
        {
            bool rpta = true;

            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new SqlCommand("sp_eliminarPersonal", con);

                cmd.Parameters.AddWithValue("@IdPersonal", id);
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    await con.OpenAsync();
                    rpta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch 
                {
                    rpta = false;
                }
            }
            return rpta;
        }

    }
}
