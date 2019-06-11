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
    [Route("api/subjects")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly ContextSubject _context;

        public SubjectController(ContextSubject context)
        {
            _context = context;

            if (_context.SubjectItems.Count() == 0)
            {
                // Create a new SubjectItem is empty,
                // whice means you can't delete all SubjectItems
                _context.SubjectItems.Add(new ItemSubject { Name = "Redes y Sistemas Distribuidos", Keycode = "IMI", Classroom = "12008" });
                _context.SaveChanges();
            }
        }

        // GET : api/subjects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemSubject>>> GetSubjectItems()
        {
            return await _context.SubjectItems.ToListAsync();
        }

        // GET : api/subjects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemSubject>> GetSubjetItem(long id)
        {
            var subjectItem = await _context.SubjectItems.FindAsync(id);

            if (subjectItem == null)
            {
                return NotFound();
            }

            return subjectItem;
        }

        // POST : api/subjects
        [HttpPost]
        public async Task<ActionResult<ItemSubject>> PostSubjectItem(ItemSubject item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context.SubjectItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubjetItem), new { id = item.Id }, item);
        }

        // PUT : api/subjects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubjectItem(long id, ItemSubject item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE : api/subjects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubjectItem(long id)
        {
            var subjectItem = await _context.SubjectItems.FindAsync(id);

            if (subjectItem == null)
            {
                return NotFound();
            }

            _context.SubjectItems.Remove(subjectItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }

}




