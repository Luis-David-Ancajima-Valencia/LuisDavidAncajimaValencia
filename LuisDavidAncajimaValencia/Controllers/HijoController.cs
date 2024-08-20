using LuisDavidAncajimaValencia.Data;
using LuisDavidAncajimaValencia.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LuisDavidAncajimaValencia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HijoController : ControllerBase
    {
        private readonly HijoData _hijoData;

        public HijoController(HijoData hijoData)
        {
            _hijoData = hijoData;
        }

        [HttpGet]
        public async Task<IActionResult> Lista()
        {
            List<Hijo> Lista = await _hijoData.Lista();
            return StatusCode(StatusCodes.Status200OK, Lista);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Obtener(int id)
        {
            List<Hijo> Lista = await _hijoData.ListaPorPersonal(id);
            //Hijo objeto = await _hijoData.ListaPorPersonal(id);
            return StatusCode(StatusCodes.Status200OK, Lista);
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] Hijo objeto)
        {
            bool rpta = await _hijoData.CrearHijo(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = rpta });
        }

        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] Hijo objeto)
        {
            bool rpta = await _hijoData.EditarHijo(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = rpta });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            bool rpta = await _hijoData.EliminarHijo(id);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = rpta });
        }

    }

}
