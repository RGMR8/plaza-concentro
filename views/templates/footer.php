  <footer>
    <p>© Plaza Concentro – Centro de Negocios</p>
  </footer>

  <script src="<?= ASSETS_URL ?>js/script.js"></script>

  <?php if (!empty($extra_js ?? null)): ?>
    <?php foreach ($extra_js as $js): ?>
      <script src="<?= ASSETS_URL . 'js/' . $js ?>"></script>
    <?php endforeach; ?>
  <?php endif; ?>
</body>
</html>