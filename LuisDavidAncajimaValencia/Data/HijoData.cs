using LuisDavidAncajimaValencia.Models;
using System.Data;
using System.Data.SqlClient;

namespace LuisDavidAncajimaValencia.Data
{
    public class HijoData
    {
        private readonly string conexion;

        public HijoData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("CadenaSql")!;
        }

        public async Task<List<Hijo>> Lista()
        {
            List<Hijo> lista = new List<Hijo>();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_listaHijo", con);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync()) {
                    while (await reader.ReadAsync()) {
                        lista.Add(new Hijo
                        {
                            IdHijo = Convert.ToInt32(reader["IdHijo"]),
                            TipoDoc = reader["TipoDoc"].ToString(),
                            NumeroDoc = reader["NumeroDoc"].ToString(),
                            ApPaterno = reader["ApPaterno"].ToString(),
                            ApMaterno = reader["ApMaterno"].ToString(),
                            Nombre1 = reader["Nombre1"].ToString(),
                            Nombre2 = reader["Nombre2"].ToString(),
                            FechaNac = reader["FechaNac"].ToString(),
                            IdPersonal = Convert.ToInt32(reader["IdPersonal"])
                        });
                    }
                }
            }
            return lista;
        }

        public async Task<List<Hijo>> ListaPorPersonal(int idPersonal)
        {
            List<Hijo> lista = new List<Hijo>();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_listaHijoPorPersonal", con);
                cmd.Parameters.AddWithValue("@IdPersonal", idPersonal);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        lista.Add(new Hijo
                        {
                            IdHijo = Convert.ToInt32(reader["IdHijo"]),
                            TipoDoc = reader["TipoDoc"].ToString(),
                            NumeroDoc = reader["NumeroDoc"].ToString(),
                            ApPaterno = reader["ApPaterno"].ToString(),
                            ApMaterno = reader["ApMaterno"].ToString(),
                            Nombre1 = reader["Nombre1"].ToString(),
                            Nombre2 = reader["Nombre2"].ToString(),
                            FechaNac = reader["FechaNac"].ToString(),
                            IdPersonal = Convert.ToInt32(reader["IdPersonal"])
                        });
                    }
                }
            }
            return lista;
        }


        public async Task<Hijo> ObternerHijo(int id)
        {
            Hijo objeto = new Hijo();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_obtenerHijo", con);
                cmd.Parameters.AddWithValue("@IdHijo", id);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        objeto = new Hijo
                        {
                            IdHijo = Convert.ToInt32(reader["IdHijo"]),
                            TipoDoc = reader["TipoDoc"].ToString(),
                            NumeroDoc = reader["NumeroDoc"].ToString(),
                            ApPaterno = reader["ApPaterno"].ToString(),
                            ApMaterno = reader["ApMaterno"].ToString(),
                            Nombre1 = reader["Nombre1"].ToString(),
                            Nombre2 = reader["Nombre2"].ToString(),
                            FechaNac = reader["FechaNac"].ToString(),
                            IdPersonal = Convert.ToInt32(reader["IdPersonal"])
                        };
                    }
                }
            }
            return objeto;
        }

        public async Task<bool> CrearHijo(Hijo hijo)
        {
            bool rpta = true;

            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new SqlCommand("sp_crearHijo", con);
                cmd.Parameters.AddWithValue("@TipoDoc", hijo.TipoDoc);
                cmd.Parameters.AddWithValue("@NumeroDoc", hijo.NumeroDoc);
                cmd.Parameters.AddWithValue("@ApPaterno", hijo.ApPaterno);
                cmd.Parameters.AddWithValue("@ApMaterno", hijo.ApMaterno);
                cmd.Parameters.AddWithValue("@Nombre1", hijo.Nombre1);
                cmd.Parameters.AddWithValue("@Nombre2", hijo.Nombre2);
                cmd.Parameters.AddWithValue("@FechaNac", hijo.FechaNac);
                cmd.Parameters.AddWithValue("@IdPersonal", hijo.IdPersonal);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await con.OpenAsync();
                    rpta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch {
                    rpta = false;
                }
            }
            return rpta;
        }

        public async Task<bool> EditarHijo(Hijo hijo)
        {
            bool rpta = true;

            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new SqlCommand("sp_EditarHijo", con);

                cmd.Parameters.AddWithValue("@IdHijo", hijo.IdHijo);
                cmd.Parameters.AddWithValue("@TipoDoc", hijo.TipoDoc);
                cmd.Parameters.AddWithValue("@NumeroDoc", hijo.NumeroDoc);
                cmd.Parameters.AddWithValue("@ApPaterno", hijo.ApPaterno);
                cmd.Parameters.AddWithValue("@ApMaterno", hijo.ApMaterno);
                cmd.Parameters.AddWithValue("@Nombre1", hijo.Nombre1);
                cmd.Parameters.AddWithValue("@Nombre2", hijo.Nombre2);
                cmd.Parameters.AddWithValue("@FechaNac", hijo.FechaNac);
                cmd.Parameters.AddWithValue("@IdPersonal", hijo.IdPersonal);
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

        public async Task<bool> EliminarHijo(int id)
        {
            bool rpta = true;

            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new SqlCommand("sp_eliminarHijo", con);

                cmd.Parameters.AddWithValue("@IdHijo", id);
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
