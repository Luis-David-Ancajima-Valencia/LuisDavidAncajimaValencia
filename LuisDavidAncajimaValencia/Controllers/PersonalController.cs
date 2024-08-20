using LuisDavidAncajimaValencia.Data;
using LuisDavidAncajimaValencia.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



namespace LuisDavidAncajimaValencia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalController : ControllerBase
    {
        private readonly PersonalData _personalData;

        public PersonalController(PersonalData personalData)
        {
            _personalData = personalData;
        }

        [HttpGet]
        public  async Task<IActionResult> Lista() 
        { 
            List<Personal> Lista = await _personalData.Lista();
            return StatusCode(StatusCodes.Status200OK,Lista);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Obtener(int id)
        {
            Personal objeto = await _personalData.ObternerPersonal(id);
            return StatusCode(StatusCodes.Status200OK, objeto);
        }



        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] Personal objeto)
        {
            bool rpta = await _personalData.CrearPersonal(objeto);
            return StatusCode(StatusCodes.Status200OK, new {isSuccess = rpta});
        }

        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] Personal objeto)
        {
            bool rpta = await _personalData.EditarPersonal(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = rpta });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            bool rpta = await _personalData.EliminarPersonal(id);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = rpta });
        }

    }
}
