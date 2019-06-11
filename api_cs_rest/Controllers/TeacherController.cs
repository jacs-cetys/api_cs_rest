using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using CsMyApi.Models;

namespace CsMyApi.Controllers
{
    // [Route("api/[controller]")]
    [Route("api/teachers")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ContextTeacher _context;

        public TeacherController(ContextTeacher context)
        {
            _context = context;

            if (_context.TeacherItems.Count() == 0)
            {
                // Create a new ItemTeacher is empty,
                // whice means you can't delete all ItemTeachers
                _context.TeacherItems.Add(new ItemTeacher { FirstName = "Edwin", LastName = "Salinas", Email = "edwin.salinas@cetys.mx" });
                _context.SaveChanges();
            }
        }

        // GET : api/teachers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemTeacher>>> GetTeacherItems()
        {
            return await _context.TeacherItems.ToListAsync();
        }

        // GET : api/teachers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemTeacher>> GetTeacherItem(long id)
        {
            var teacherItem = await _context.TeacherItems.FindAsync(id);

            if (teacherItem == null)
            {
                return NotFound();
            }

            return teacherItem;
        }

        // POST : api/teachers
        [HttpPost]
        public async Task<ActionResult<ItemTeacher>> PostTeacherItem(ItemTeacher item)
        {
            _context.TeacherItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTeacherItem), new { id = item.Id }, item);
        }

        // PUT : api/teachers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacherItem(long id, ItemTeacher item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE : api/teachers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacherItem(long id)
        {
            var teacherItem = await _context.TeacherItems.FindAsync(id);

            if (teacherItem == null)
            {
                return NotFound();
            }

            _context.TeacherItems.Remove(teacherItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}




